import nodemailer from 'nodemailer';

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendRegistrationEmail(to: string, name: string) {
        const subject = 'Welcome to Our Hotel Booking System';
        const text = `Hello ${name},\n\nThank you for registering with us! We hope you enjoy your experience.\n\nBest regards,\nHotel Booking Team`;
        
        await this.transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
        });
    }

    async sendBookingConfirmationEmail(to: string, hotelName: string, bookingDetails: string) {
        const subject = 'Booking Confirmation';
        const text = `Dear Customer,\n\nYour booking at ${hotelName} has been confirmed.\nDetails:\n${bookingDetails}\n\nThank you for choosing us!\n\nBest regards,\nHotel Booking Team`;
        
        await this.transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
        });
    }
}

export default new EmailService();