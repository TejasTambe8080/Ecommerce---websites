import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title.jsx';
import CartTotal from '../components/CartTotal.jsx';
import { ShopContext } from '../context/ShopContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets.js';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  const {
    backendURL,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext);

  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      toast.info('Please login to place an order');
      navigate('/login');
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    setFormData(data => ({ ...data, [e.target.name]: e.target.value }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.pinCode || !formData.country) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setLoading(true);

    try {
      const orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find(product => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      // ======================
      // PAYMENT METHODS
      // ======================
      if (method === 'cod') {
        const response = await axios.post(
          backendURL + '/api/order/place',
          orderData,
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success('Order placed successfully! 🎉');
          setCartItems({});
          navigate('/order-success');
        } else {
          toast.error(response.data.message || 'Failed to place order');
        }

      } else if (method === 'stripe') {
        const responseStripe = await axios.post(
          backendURL + '/api/order/stripe',
          orderData,
          { headers: { token } }
        );

        if (responseStripe.data.success) {
          window.location.href = responseStripe.data.url;
        } else {
          toast.error('Failed to initiate Stripe payment');
        }

      } else if (method === 'razorpay') {
        const responseRazorpay = await axios.post(
          backendURL + '/api/order/razorpay',
          orderData,
          { headers: { token } }
        );

        if (responseRazorpay.data.success) {
          const { razorpayOrder, orderId, key } = responseRazorpay.data;
          
          const options = {
            key: key,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: 'Cartiva',
            description: 'Order Payment',
            order_id: razorpayOrder.id,
            handler: async function (response) {
              try {
                const verifyResponse = await axios.post(
                  backendURL + '/api/order/razorpay/verify',
                  { 
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId: orderId
                  },
                  { headers: { token } }
                );
                
                if (verifyResponse.data.success) {
                  toast.success('Payment successful!');
                  setCartItems({});
                  navigate('/order-success');
                } else {
                  toast.error('Payment verification failed');
                }
              } catch (error) {
                toast.error('Payment verification error');
              }
            },
            prefill: {
              name: formData.firstName + ' ' + formData.lastName,
              email: formData.email,
              contact: formData.phone
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          toast.error('Failed to initiate Razorpay payment');
        }
      }

    } catch (error) {
      console.error(error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="flex flex-col lg:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-0"
    >
      {/* LEFT SIDE - Delivery Info */}
      <div className="flex flex-col gap-4 w-full lg:max-w-[500px]">
        <div className="text-xl sm:text-2xl mb-2">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              name="firstName" 
              value={formData.firstName} 
              onChange={onChangeHandler} 
              className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:border-orange-500" 
              placeholder="First Name *" 
              required 
            />
            <input 
              name="lastName" 
              value={formData.lastName} 
              onChange={onChangeHandler} 
              className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:border-orange-500" 
              placeholder="Last Name *" 
              required 
            />
          </div>

          <input 
            name="email" 
            value={formData.email} 
            onChange={onChangeHandler} 
            className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:border-orange-500" 
            type="email" 
            placeholder="Email address" 
          />
          
          <input 
            name="phone" 
            value={formData.phone} 
            onChange={onChangeHandler} 
            className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:border-orange-500" 
            placeholder="Phone Number *" 
            required 
          />
          
          <input 
            name="street" 
            value={formData.street} 
            onChange={onChangeHandler} 
            className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:border-orange-500" 
            placeholder="Street Address" 
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              name="city" 
              value={formData.city} 
              onChange={onChangeHandler} 
              className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:border-orange-500" 
              placeholder="City" 
            />
            <input 
              name="state" 
              value={formData.state} 
              onChange={onChangeHandler} 
              className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:border-orange-500" 
              placeholder="State" 
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              name="pinCode" 
              value={formData.pinCode} 
              onChange={onChangeHandler} 
              className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:border-orange-500" 
              placeholder="Pin Code *" 
              required 
            />
            <input 
              name="country" 
              value={formData.country} 
              onChange={onChangeHandler} 
              className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:border-orange-500" 
              placeholder="Country *" 
              required 
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Cart & Payment */}
      <div className="w-full lg:max-w-[450px]">
        <CartTotal showCheckoutButton={false} />

        <div className="mt-8">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex flex-col gap-3 mt-4">
            {/* Stripe Option */}
            <div 
              onClick={() => !loading && setMethod('stripe')} 
              className={`flex items-center gap-3 border-2 p-3 px-4 cursor-pointer rounded-lg transition-all ${
                method === 'stripe' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                method === 'stripe' ? 'border-orange-500' : 'border-gray-400'
              }`}>
                {method === 'stripe' && <div className='w-2 h-2 bg-orange-500 rounded-full'/>}
              </div>
              <img src={assets.stripe_logo} alt="Stripe" className="h-5" />
              <p className="text-gray-700 text-sm font-medium">Pay with Card</p>
            </div>

            {/* Razorpay Option */}
            <div 
              onClick={() => !loading && setMethod('razorpay')} 
              className={`flex items-center gap-3 border-2 p-3 px-4 cursor-pointer rounded-lg transition-all ${
                method === 'razorpay' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                method === 'razorpay' ? 'border-orange-500' : 'border-gray-400'
              }`}>
                {method === 'razorpay' && <div className='w-2 h-2 bg-orange-500 rounded-full'/>}
              </div>
              <img src={assets.razorpay_logo} alt="Razorpay" className="h-5" />
              <p className="text-gray-700 text-sm font-medium">UPI / Cards / Netbanking</p>
            </div>

            {/* COD Option */}
            <div 
              onClick={() => !loading && setMethod('cod')} 
              className={`flex items-center gap-3 border-2 p-3 px-4 cursor-pointer rounded-lg transition-all ${
                method === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                method === 'cod' ? 'border-orange-500' : 'border-gray-400'
              }`}>
                {method === 'cod' && <div className='w-2 h-2 bg-orange-500 rounded-full'/>}
              </div>
              <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'/>
              </svg>
              <p className="text-gray-700 text-sm font-medium">Cash on Delivery</p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="w-full mt-8">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-500 text-white py-4 text-sm font-semibold rounded-lg hover:bg-orange-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `PLACE ORDER${method === 'cod' ? '' : ' & PAY'}`
              )}
            </button>
          </div>

          {/* Security Note */}
          <p className='text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1'>
            <svg className='w-4 h-4 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
            </svg>
            Secure & encrypted checkout
          </p>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
