import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'

const CartTotal = () => {
  const {currency, getCardAmount, delivery_fee} = useContext(ShopContext);
  const navigate = useNavigate();
  
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency}{getCardAmount()}.00</p>
        </div>
        <hr/>
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr/>
        <div className='flex justify-between font-medium text-lg'>
          <p>Total</p>
          <p>{currency}{getCardAmount() === 0 ? 0 : getCardAmount() + delivery_fee}.00</p>
        </div>
      </div>
      
      <div className='w-full text-end mt-8'>
        <button 
          onClick={() => navigate('/place-order')}
          className='bg-black text-white text-sm px-8 py-3'
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  )
}

export default CartTotal
