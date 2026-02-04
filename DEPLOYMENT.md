# Deployment Guide for E-Commerce Application

This guide covers deploying your e-commerce application to various platforms.

## Option 1: Deploy to Render (Backend) + Vercel (Frontend)

### Step 1: Deploy Backend to Render

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/ecommerce-app.git
   git push -u origin main
   ```

2. **Create a Render account** at https://render.com

3. **Create a new Web Service**
   - Connect your GitHub repository
   - **Name**: `ecommerce-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Add Environment Variables** in Render Dashboard:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_SECRET_KEY=your_secret_key
   STRIPE_SECRET_KEY=sk_test_...
   RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=...
   ```

5. **Deploy** and note the URL (e.g., `https://ecommerce-backend.onrender.com`)

### Step 2: Deploy Frontend to Vercel

1. **Create a Vercel account** at https://vercel.com

2. **Import your GitHub repository**

3. **Configure project**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variable**:
   ```
   VITE_BACKEND_URL=https://ecommerce-backend.onrender.com
   ```

5. **Deploy**

### Step 3: Deploy Admin Panel to Vercel

Repeat Step 2 with:
- **Root Directory**: `admin`
- Same environment variable

---

## Option 2: Deploy to Railway

1. **Create Railway account** at https://railway.app

2. **Create new project from GitHub repo**

3. **Add MongoDB from Railway's Add-on marketplace**

4. **Configure Backend Service**:
   - Root Directory: `backend`
   - Add environment variables

5. **Configure Frontend Service**:
   - Root Directory: `frontend`
   - Add `VITE_BACKEND_URL` pointing to backend URL

---

## Option 3: Deploy to DigitalOcean App Platform

1. **Create DigitalOcean account**

2. **Create a new App** and connect GitHub

3. **Add three components**:
   - Backend (Web Service)
   - Frontend (Static Site)
   - Admin (Static Site)

4. **Configure each component** with appropriate environment variables

---

## MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas

2. Create a free cluster

3. Create a database user

4. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

5. **Whitelist IP**: Add `0.0.0.0/0` for cloud deployments

---

## Cloudinary Setup

1. Go to https://cloudinary.com and create an account

2. Go to Dashboard to get:
   - Cloud name
   - API Key
   - API Secret

---

## Stripe Setup

1. Go to https://stripe.com and create an account

2. Go to **Developers** > **API Keys**

3. Copy the **Secret key** (starts with `sk_test_` or `sk_live_`)

---

## Razorpay Setup

1. Go to https://razorpay.com and create an account

2. Go to **Settings** > **API Keys**

3. Generate and copy both Key ID and Key Secret

---

## Post-Deployment Checklist

- [ ] Backend API responding at `/` endpoint
- [ ] Frontend loading correctly
- [ ] Admin panel accessible
- [ ] Products can be added via admin
- [ ] Products display on frontend
- [ ] User registration/login works
- [ ] Add to cart works
- [ ] Checkout process works
- [ ] Payment integration works (Stripe/Razorpay)
- [ ] Orders appear in admin panel

---

## Troubleshooting

### CORS Errors
Backend is already configured with CORS. If issues persist, check the backend URL in frontend `.env`.

### MongoDB Connection Failed
- Verify connection string
- Ensure IP is whitelisted in Atlas

### Images Not Uploading
- Verify Cloudinary credentials
- Check file size limits

### Payment Errors
- Ensure using test keys in development
- Switch to live keys in production
