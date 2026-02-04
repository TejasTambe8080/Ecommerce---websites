import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendURL, currency } from '../App.jsx';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendURL + '/api/order/list',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendURL + '/api/order/status',
        { orderId: orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchOrders();
        toast.success('Order status updated');
      }
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="border-t pt-10 px-4 sm:px-10 min-h-screen bg-gray-50">
      <div className="text-2xl mb-8">
        <h3 className="font-bold">All Orders</h3>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {/* LEFT */}
              <div className="flex gap-4">
                <img
                  src={assets.parcel_icon}
                  alt="parcel"
                  className="w-12 h-12"
                />
                <div className="text-sm text-gray-700">
                  {order.items.map((item, idx) => (
                    <p key={idx}>
                      {item.name} x {item.quantity}
                      <span className="ml-2 text-gray-500">
                        ({item.size})
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* MIDDLE */}
              <div className="text-sm text-gray-700">
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{' '}
                  {order.address.country} - {order.address.pinCode}
                </p>
                <p className="mt-1">📞 {order.address.phone}</p>
              </div>

              {/* RIGHT */}
              <div className="text-sm text-gray-700 flex flex-col gap-1">
                <p>
                  <span className="font-medium">Items:</span>{' '}
                  {order.items.length}
                </p>
                <p>
                  <span className="font-medium">Method:</span>{' '}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{' '}
                  {order.payment ? 'Done' : 'Pending'}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="font-semibold mt-2">
                  {currency}
                  {order.amount}
                </p>

                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  className="border mt-2 px-2 py-1 rounded bg-gray-100 cursor-pointer"
                  value={order.status}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
