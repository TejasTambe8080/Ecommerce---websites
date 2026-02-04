import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext.jsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const { token, setCartItems, backendURL } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendURL + '/api/order/verify',
        { orderId, success },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success('Payment verified successfully');
        navigate('/order-success');
      } else {
        toast.error('Payment failed');
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error in verifying payment:', error);
      toast.error('Payment verification failed');
      navigate('/cart');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-lg font-medium">Verifying your payment, please wait...</p>
    </div>
  );
};

export default Verify;
