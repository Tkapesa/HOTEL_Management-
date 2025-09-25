import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking-system';
    
    // Check if we're in development mode without MongoDB
    if (process.env.NODE_ENV === 'development' && !process.env.MONGODB_URI?.includes('mongodb+srv')) {
      console.log('⚠️  MongoDB not configured. Using development mode without database.');
      console.log('📝 To use a real database:');
      console.log('   1. Install MongoDB locally: brew install mongodb-community');
      console.log('   2. Or use MongoDB Atlas: https://www.mongodb.com/atlas');
      console.log('   3. Update MONGODB_URI in .env file');
      return;
    }
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    console.log('🔧 Continuing without database for development...');
    // Don't exit in development mode
    if (process.env.NODE_ENV !== 'development') {
      process.exit(1);
    }
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('📡 MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

export default connectDB;