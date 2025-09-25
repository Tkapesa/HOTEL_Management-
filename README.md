# Hotel Booking and Management System

## Overview
This project is a full-stack hotel booking and management system that allows users to search for hotels, book rooms, and manage their bookings. The system consists of a backend built with Node.js and Express, and a frontend developed using React.

## Features
- User authentication (registration, login, token refresh)
- Hotel management (create, fetch hotels)
- Room management (fetch room types and availability)
- Booking management (create and retrieve bookings)
- Payment processing (integrated with Stripe)
- Email notifications for registration and booking confirmations
- File uploads for hotel images

## Technologies Used
- **Backend**: Node.js, Express, MongoDB, Mongoose, TypeScript
- **Frontend**: React, TypeScript
- **Payment Processing**: Stripe
- **Email Service**: Nodemailer
- **Deployment**: Docker, GitHub Actions for CI/CD

## Project Structure
```
hotel-booking-system
├── backend
│   ├── src
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── tsconfig.json
├── shared
│   └── types
├── .github
│   └── workflows
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
└── README.md
```

## Setup Instructions

### Backend Setup
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on the `.env.example` file and configure your environment variables.
4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend application:
   ```
   npm start
   ```

### Docker Setup
1. Build and run the application using Docker:
   ```
   docker-compose up --build
   ```

## CI/CD Deployment
The project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/ci-cd.yml`. It includes steps for building and deploying both the backend and frontend applications.

## Usage
- Access the frontend application at `http://localhost:3000`.
- Use the provided API endpoints for backend operations (refer to the backend documentation for details).

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.