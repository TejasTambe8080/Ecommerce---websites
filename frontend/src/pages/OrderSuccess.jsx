import React from 'react'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4'>
      <div className='w-24 h-24 rounded-full bg-green-100 flex items-center justify-center'>
        <svg className='w-14 h-14 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      </div>
      
      <h1 className='text-3xl font-semibold text-gray-800 text-center'>Order Placed Successfully! 🎉</h1>
      
      <div className='text-center max-w-lg'>
        <p className='text-gray-600 text-lg'>
          Thank you for shopping with Cartiva!
        </p>
        <p className='text-gray-500 mt-2'>
          Your order has been confirmed and will be delivered to your doorstep soon. 
          You will receive order updates via email and SMS.
        </p>
      </div>

      <div className='bg-gray-50 p-6 rounded-lg text-center max-w-md w-full mt-2'>
        <p className='text-sm text-gray-500'>What's Next?</p>
        <p className='text-gray-700 mt-1'>Track your order in the "My Orders" section. We'll keep you updated at every step!</p>
      </div>
      
      <div className='flex flex-col sm:flex-row gap-4 mt-4'>
        <Link 
          to='/orders' 
          className='bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-all text-center'
        >
          VIEW MY ORDERS
        </Link>
        <Link 
          to='/collection' 
          className='border border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all text-center'
        >
          CONTINUE SHOPPING
        </Link>
      </div>

      <p className='text-gray-400 text-sm mt-4'>
        Need help? Contact us at support@cartiva.com
      </p>
    </div>
  )
}

export default OrderSuccess
