import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/database';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

// Create Express application
const app: Application = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});

app.use('/api', limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  }
});

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/v1/auth', authLimiter, authRoutes);

// Add missing routes with basic implementations
app.get('/api/v1/hotels', (req: Request, res: Response) => {
  // Mock hotel data for development
  res.json({
    success: true,
    data: [
      {
        id: '1',
        name: 'Grand Plaza Hotel',
        location: 'New York, NY',
        description: 'Luxury hotel in Manhattan',
        price: 299,
        rating: 4.5,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
      },
      {
        id: '2', 
        name: 'Ocean View Resort',
        location: 'Miami, FL',
        description: 'Beautiful beachfront resort',
        price: 199,
        rating: 4.3,
        imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'
      }
    ]
  });
});

app.get('/api/v1/hotels/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    success: true,
    data: {
      id,
      name: 'Sample Hotel',
      description: 'A beautiful hotel',
      location: 'Sample City',
      rooms: [
        { id: '1', type: 'Standard', price: 100 },
        { id: '2', type: 'Deluxe', price: 150 }
      ]
    }
  });
});

app.get('/api/v1/bookings/user/:userId', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: []
  });
});

app.post('/api/v1/bookings', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: { id: 'booking-123', status: 'confirmed' }
  });
});

// Handle undefined routes
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
interface CustomError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);

  // Default error response
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';

  // MongoDB validation error
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
  }

  // MongoDB duplicate key error
  if ((error as any).code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value';
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

export default app;