import React from 'react'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 py-10'>
      {/* Success Icon */}
      <div className='w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce'>
        <svg className='w-14 h-14 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      </div>
      
      <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800 text-center'>Order Placed Successfully! 🎉</h1>
      
      <div className='text-center max-w-lg'>
        <p className='text-gray-600 text-base sm:text-lg'>
          Thank you for shopping with us!
        </p>
        <p className='text-gray-500 mt-2 text-sm sm:text-base'>
          Your order has been confirmed and will be delivered to your doorstep soon. 
          You will receive order updates via email and SMS.
        </p>
      </div>

      {/* Order Info Card */}
      <div className='bg-gradient-to-r from-orange-50 to-green-50 p-6 rounded-xl text-center max-w-md w-full mt-2 border border-gray-100'>
        <div className='flex items-center justify-center gap-2 mb-2'>
          <svg className='w-5 h-5 text-orange-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
          <p className='text-sm font-medium text-gray-700'>What's Next?</p>
        </div>
        <p className='text-gray-600 text-sm'>Track your order in the "My Orders" section. We'll keep you updated at every step!</p>
      </div>
      
      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md'>
        <Link 
          to='/orders' 
          className='flex-1 bg-orange-500 text-white px-8 py-3.5 text-sm font-semibold hover:bg-orange-600 transition-all text-center rounded-lg'
        >
          VIEW MY ORDERS
        </Link>
        <Link 
          to='/collection' 
          className='flex-1 border-2 border-gray-800 text-gray-800 px-8 py-3.5 text-sm font-semibold hover:bg-gray-800 hover:text-white transition-all text-center rounded-lg'
        >
          CONTINUE SHOPPING
        </Link>
      </div>

      <p className='text-gray-400 text-sm mt-4'>
        Need help? Contact us at <span className='text-orange-500'>support@cartiva.com</span>
      </p>
    </div>
  )
}

export default OrderSuccess
