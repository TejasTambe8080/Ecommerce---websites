import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title.jsx';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal.jsx';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('=== CART DEBUG ===');
    console.log('1. cartItems from context:', cartItems);
    console.log(
      '2. cartItems type:',
      typeof cartItems,
      Array.isArray(cartItems) ? 'ARRAY' : 'OBJECT'
    );
    console.log('3. products from context:', products);

    if (products.length === 0) {
      console.warn('Products list is empty. Cart cannot be rendered properly.');
      setCartData([]);
      return;
    }

    if (products.length > 0) {
      let tempData = [];

      for (const itemId in cartItems) {
        console.log('4. Processing itemId:', itemId, 'data:', cartItems[itemId]);

        for (const size in cartItems[itemId]) {
          console.log(
            '5. Processing size:',
            size,
            'quantity:',
            cartItems[itemId][size]
          );

          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }

      console.log('6. Normalized cartData:', tempData);
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Your cart is empty</p>
      ) : (
        <div>
          {cartData.map((item, index) => {
            const productData = products.find(
              (prod) => prod._id === item._id
            );

            console.log(
              '7. Looking for product id:',
              item._id,
              'Found:',
              productData
            );

            if (!productData) {
              console.warn('8. Product NOT FOUND for id:', item._id);
              return null;
            }

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={
                      Array.isArray(productData.images)
                        ? productData.images[0]
                        : productData.images
                    }
                    alt={productData.name}
                    className="w-16 sm:w-20"
                    onError={(e) =>
                      console.error('9. Image failed to load:', e.target.src)
                    }
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-200">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                <input
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="w-16 p-1 border text-center px-1 sm:max-w-20 sm:px-2"
                />

                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default Cart;
