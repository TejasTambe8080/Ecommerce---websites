import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title.jsx';
import CartTotal from '../components/CartTotal.jsx';
import { ShopContext } from '../context/ShopContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');

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
          toast.success('Order placed successfully');
          setCartItems({});
          navigate('/order-success');
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
            name: 'E-Commerce App',
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
                  navigate('/orders');
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
      toast.error('Failed to place order');
    }
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl my-3 sm:text-2xl">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input name="firstName" value={formData.firstName} onChange={onChangeHandler} className="border py-1.5 px-3.5 w-full" placeholder="First Name" required />
          <input name="lastName" value={formData.lastName} onChange={onChangeHandler} className="border py-1.5 px-3.5 w-full" placeholder="Last Name" required />
        </div>

        <input name="email" value={formData.email} onChange={onChangeHandler} className="border py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
        <input name="street" value={formData.street} onChange={onChangeHandler} className="border py-1.5 px-3.5 w-full" placeholder="Street Address" />

        <div className="flex gap-3">
          <input name="city" value={formData.city} onChange={onChangeHandler} className="border py-1.5 px-3.5 w-full" placeholder="City" />
          <input name="state" value={formData.state} onChange={onChangeHandler} className="border py-1.5 px-3.5 w-full" placeholder="State" />
        </div>

        <div className="flex gap-3">
          <input name="pinCode" value={formData.pinCode} onChange={onChangeHandler} className="border py-1.5 px-3.5 w-full" placeholder="Pin code" required />
          <input name="country" value={formData.country} onChange={onChangeHandler} className="border py-1.5 px-3.5 w-full" placeholder="Country" required />
        </div>

        <input name="phone" value={formData.phone} onChange={onChangeHandler} className="border py-1.5 px-3.5 w-full" placeholder="Phone Number" required />
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-8 w-full sm:max-w-[420px]">
        <CartTotal />

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex flex-col gap-4 mt-4">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 cursor-pointer px-3">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`} />
              <p className="text-gray-700 text-sm font-medium">STRIPE</p>
            </div>

            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 cursor-pointer px-3">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`} />
              <p className="text-gray-700 text-sm font-medium">RAZORPAY</p>
            </div>

            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 cursor-pointer px-3">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`} />
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white py-3 px-16 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
