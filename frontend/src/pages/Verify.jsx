import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext.jsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const { token, setCartItems, backendURL } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, failed

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) {
        // Wait for token to be available
        return;
      }

      const response = await axios.post(
        backendURL + '/api/order/verify',
        { orderId, success },
        { headers: { token } }
      );

      if (response.data.success) {
        setStatus('success');
        setCartItems({});
        toast.success('Payment successful! 🎉');
        setTimeout(() => navigate('/order-success'), 1500);
      } else {
        setStatus('failed');
        toast.error('Payment failed');
        setTimeout(() => navigate('/cart'), 2000);
      }
    } catch (error) {
      console.error('Error in verifying payment:', error);
      setStatus('failed');
      toast.error('Payment verification failed');
      setTimeout(() => navigate('/cart'), 2000);
    }
  };

  useEffect(() => {
    if (token) {
      verifyPayment();
    }
  }, [token]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      {status === 'verifying' && (
        <>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-700">Verifying your payment...</p>
          <p className="text-sm text-gray-500">Please don't close this window</p>
        </>
      )}
      
      {status === 'success' && (
        <>
          <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center'>
            <svg className='w-10 h-10 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <p className="text-lg font-medium text-green-600">Payment Successful!</p>
          <p className="text-sm text-gray-500">Redirecting to order confirmation...</p>
        </>
      )}
      
      {status === 'failed' && (
        <>
          <div className='w-16 h-16 rounded-full bg-red-100 flex items-center justify-center'>
            <svg className='w-10 h-10 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </div>
          <p className="text-lg font-medium text-red-600">Payment Failed</p>
          <p className="text-sm text-gray-500">Redirecting back to cart...</p>
        </>
      )}
    </div>
  );
};

export default Verify;
