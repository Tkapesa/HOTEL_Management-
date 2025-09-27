import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createBooking } from '../../services/api';

interface BookingFormProps {
  hotelId: string;
  roomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

interface BookingFormData {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  hotelId,
  roomId = '',
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 2
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState<BookingFormData>({
    checkInDate: initialCheckIn,
    checkOutDate: initialCheckOut,
    guests: initialGuests,
    roomType: roomId,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Mock room types for demonstration
  const roomTypes = [
    { id: '1', type: 'Standard Room', price: 199, description: 'Comfortable room with city views' },
    { id: '2', type: 'Deluxe Suite', price: 299, description: 'Spacious suite with living area' },
    { id: '3', type: 'Presidential Suite', price: 599, description: 'Ultimate luxury with panoramic views' }
  ];

  const selectedRoom = roomTypes.find(room => room.id === formData.roomType);
  const nights = Math.max(1, Math.ceil((new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) / (1000 * 60 * 60 * 24)));
  const totalAmount = selectedRoom ? selectedRoom.price * nights : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.checkInDate && formData.checkOutDate && formData.roomType && formData.guests > 0;
      case 2:
        return formData.firstName.trim() && formData.lastName.trim() && formData.email.trim() && formData.phone.trim();
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock booking creation
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // const bookingData = {
      //   hotelId,
      //   ...formData,
      //   totalAmount,
      //   nights
      // };
      // await createBooking(bookingData);
      
      history.push('/booking-confirmation');
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
              <span
                className={`ml-2 font-medium ${
                  step <= currentStep ? 'text-primary-600' : 'text-gray-500'
                }`}
              >
                {step === 1 ? 'Dates & Room' : step === 2 ? 'Guest Info' : 'Confirmation'}
              </span>
              {step < 3 && (
                <div
                  className={`w-8 h-0.5 ml-4 ${
                    step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Dates and Room Selection */}
        {currentStep === 1 && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Dates and Room</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Select Room Type</label>
              <div className="space-y-4">
                {roomTypes.map((room) => (
                  <div
                    key={room.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.roomType === room.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange({ target: { name: 'roomType', value: room.id } } as any)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{room.type}</h4>
                        <p className="text-gray-600 text-sm">{room.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${room.price}</div>
                        <div className="text-gray-500 text-sm">per night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Guest Information */}
        {currentStep === 2 && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                  placeholder="Enter your last name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={4}
                className="input-field"
                placeholder="Any special requests or preferences..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Booking Summary */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Stay Details</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span>{new Date(formData.checkInDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span>{new Date(formData.checkOutDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nights:</span>
                        <span>{nights}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span>{formData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Room:</span>
                        <span>{selectedRoom?.type}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Guest Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>{formData.firstName} {formData.lastName}</div>
                      <div>{formData.email}</div>
                      <div>{formData.phone}</div>
                      {formData.specialRequests && (
                        <div className="mt-2">
                          <span className="font-medium">Special Requests:</span>
                          <p className="mt-1 text-gray-500">{formData.specialRequests}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Price Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Room rate (${selectedRoom?.price}/night)</span>
                      <span>${selectedRoom?.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of nights</span>
                      <span>× {nights}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Amount</span>
                        <span>${totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="card p-4 bg-red-50 border-red-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-800">{error}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8">
          <button
            type="button"
            onClick={prevStep}
            className={`btn-secondary ${currentStep === 1 ? 'invisible' : ''}`}
          >
            Previous
          </button>
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Confirm Booking'
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;