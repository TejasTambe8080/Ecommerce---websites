import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Cart = () => {
  const {products,currency,delivery_fee,cartItems} = useContext(ShopContext);
  const [cartData,setCartData] = useState([]);

  useEffect(()=>{
    let tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          tempData.push({
            _id:items,
            size:item,
            quantity:cartItems[items][item] 
          })
        }
      }
    }
    setCartData(tempData);
  },[cartItems])
  
  return (
    <div className='border-t pt-14'>
      <div className='mb-3 text-2xl'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find(prod => prod.id === parseInt(item._id));
            return(
             <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img src={productData.image[0] || productData.image} alt={productData.name} className='w-16 sm:w-20'/>
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-200'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input type="number" min={1} defaultValue={item.quantity} className='w-16 p-1 border text-center px-1 sm:max-w-20 sm:px-2 '/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cart
