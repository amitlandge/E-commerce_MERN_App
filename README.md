# E-commerce MERN App

This is a full-stack e-commerce application built using the MERN (MongoDB, Express, React, Node.js) stack.

## Features

- User authentication (Login/Signup)
- Product search, filtering, and sorting
- Shopping cart functionality
- Order management (CRUD)
- Responsive design
- Payment integration (Stripe/PayPal)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/e-commerce-mern-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd e-commerce-mern-app
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

1. Create a `.env` file in the root of the backend and frontend directories. Add the following variables:

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_API_KEY=your_stripe_key
CLOUDINARY_URL=your_cloudinary_url
```
