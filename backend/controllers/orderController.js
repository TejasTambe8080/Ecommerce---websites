import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Stripe gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Razorpay gateway
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Global variables
const currency = 'INR';
const delivery_fee = 10;

// ======================
// Place order - COD
// ======================
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = await orderModel.create({
      userId,
      items,
      address,
      amount,
      paymentMethod: 'cod',
      payment: false,
      status: 'Order Placed',
      date: Date.now(),
    });

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// ======================
// Place order - Stripe
// ======================
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const newOrder = await orderModel.create({
      userId,
      items,
      address,
      amount,
      paymentMethod: 'stripe',
      payment: false,
      status: 'Payment Pending',
      date: Date.now(),
    });

    const line_items = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: { name: 'Delivery Charges' },
        unit_amount: delivery_fee * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Stripe order failed' });
  }
};

// ======================
// Verify Stripe (Frontend Redirect)
// ======================
const verifyStripe = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    const userId = req.userId;

    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: 'Order Placed',
      });

      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// ======================
// Place order - Razorpay
// ======================
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = await orderModel.create({
      userId,
      items,
      address,
      amount,
      paymentMethod: 'razorpay',
      payment: false,
      status: 'Payment Pending',
      date: Date.now(),
    });

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: newOrder._id.toString(),
    });

    res.json({
      success: true,
      razorpayOrder,
      orderId: newOrder._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Razorpay order failed' });
  }
};

// ======================
// Verify Razorpay Payment
// ======================
const verifyRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: 'Order Placed',
      });

      await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// ======================
// Admin - All Orders
// ======================
const allOrders = async (req, res) => {
  const orders = await orderModel.find({});
  res.json({ success: true, orders });
};

// ======================
// User Orders
// ======================
const userOrders = async (req, res) => {
  const orders = await orderModel.find({ userId: req.userId });
  res.json({ success: true, orders });
};

// ======================
// Update Order Status
// ======================
const updateStatus = async (req, res) => {
  await orderModel.findByIdAndUpdate(req.body.orderId, {
    status: req.body.status,
  });
  res.json({ success: true });
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  placeOrderRazorpay,
  verifyRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
