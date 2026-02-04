import React from 'react'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
      <div className='w-20 h-20 rounded-full bg-green-100 flex items-center justify-center'>
        <svg className='w-12 h-12 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      </div>
      
      <h1 className='text-2xl font-semibold text-gray-800'>Order Placed Successfully!</h1>
      <p className='text-gray-600 text-center max-w-md'>
        Thank you for your order. We have received your order and will process it soon.
        You will receive a confirmation email shortly.
      </p>
      
      <div className='flex gap-4 mt-4'>
        <Link 
          to='/orders' 
          className='bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition-colors'
        >
          VIEW ORDERS
        </Link>
        <Link 
          to='/collection' 
          className='border border-black px-6 py-3 text-sm hover:bg-gray-50 transition-colors'
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess
