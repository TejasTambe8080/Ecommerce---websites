import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title.jsx';
import axios from 'axios';

const Orders = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendURL + '/api/order/userorders',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No orders found</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* LEFT */}
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={Array.isArray(item.images) ? item.images[0] : item.images}
                  alt={item.name}
                />

                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-600">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-2">
                    Date:{' '}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="text-gray-400">
                    Payment: <span>{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="md:w-1/2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`min-w-2 h-2 rounded-full ${
                      item.status === 'Delivered'
                        ? 'bg-green-500'
                        : item.status === 'Shipped'
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                  ></span>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>

                <button
                  onClick={loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
