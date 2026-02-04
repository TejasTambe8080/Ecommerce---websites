import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User features
orderRouter.post('/userorders', authUser, userOrders);

// Verify payments
orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/verify', authUser, verifyStripe);
orderRouter.post('/razorpay/verify', authUser, verifyRazorpay);

export default orderRouter;