# E-Commerce Application

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

## Project Structure

```
├── backend/          # Node.js + Express API server
├── frontend/         # React customer-facing store
├── admin/            # React admin dashboard
└── package.json      # Root package.json with helper scripts
```

## Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)
- Stripe account (for payments)
- Razorpay account (for Indian payments)

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies at once
npm run install:all

# Or install individually
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

### 2. Configure Environment Variables

#### Backend (.env)
Create `backend/.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_jwt_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
STRIPE_SECRET_KEY=sk_test_xxx
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
PORT=4000
```

#### Frontend & Admin (.env)
Create `frontend/.env` and `admin/.env`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Run Development Servers

```bash
# Terminal 1: Start Backend
npm run dev:backend

# Terminal 2: Start Frontend (http://localhost:5173)
npm run dev:frontend

# Terminal 3: Start Admin (http://localhost:5174)
npm run dev:admin
```

## Deployment

### Deploy Backend (Render.com)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables from `.env.example`

### Deploy Frontend (Vercel/Netlify)

1. Create a new project
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `VITE_BACKEND_URL=https://your-backend.onrender.com`

### Deploy Admin (Vercel/Netlify)

Same as frontend, but set root directory to `admin`

## Features

### Customer Features
- Browse products by category
- Search and filter products
- Add to cart with size selection
- Checkout with multiple payment options (COD, Stripe, Razorpay)
- Order tracking
- User authentication

### Admin Features
- Add/remove products with image upload
- View and manage all orders
- Update order status
- Admin authentication

## API Endpoints

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/admin` - Admin login

### Products
- `GET /api/products/list` - Get all products
- `POST /api/products/single` - Get single product
- `POST /api/products/add` - Add product (admin)
- `POST /api/products/remove` - Remove product (admin)

### Cart
- `POST /api/cart/get` - Get user cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/update` - Update cart

### Orders
- `POST /api/order/place` - Place COD order
- `POST /api/order/stripe` - Place Stripe order
- `POST /api/order/razorpay` - Place Razorpay order
- `POST /api/order/userorders` - Get user orders
- `POST /api/order/list` - Get all orders (admin)
- `POST /api/order/status` - Update order status (admin)

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, Axios
- **Backend**: Node.js, Express 5, MongoDB, Mongoose
- **Authentication**: JWT
- **Payments**: Stripe, Razorpay
- **Image Storage**: Cloudinary
- **Notifications**: React Toastify

## License

MIT
