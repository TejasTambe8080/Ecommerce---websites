import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'

const CartTotal = ({ showCheckoutButton = true }) => {
  const {currency, getCardAmount, delivery_fee} = useContext(ShopContext);
  const navigate = useNavigate();
  
  const subtotal = getCardAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency}{subtotal.toLocaleString('en-IN')}</p>
        </div>
        <hr/>
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{subtotal === 0 ? 'Free' : `${currency}${delivery_fee}`}</p>
        </div>
        <hr/>
        <div className='flex justify-between font-semibold text-lg'>
          <p>Total</p>
          <p className='text-orange-600'>{currency}{total.toLocaleString('en-IN')}</p>
        </div>
      </div>
      
      {showCheckoutButton && (
        <div className='w-full text-end mt-8'>
          <button 
            onClick={() => navigate('/place-order')}
            disabled={subtotal === 0}
            className='bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      )}
    </div>
  )
}

export default CartTotal
