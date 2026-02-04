import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-gray-700'>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='mt-2 font-semibold'>Hassle-Free Returns</p>
        <p className='text-gray-400'>
          Changed your mind? No problem! Easy 7-day returns with full tracking.
        </p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='mt-2 font-semibold'>Secure Payments</p>
        <p className='text-gray-400'>
          Pay your way — UPI, Cards, Net Banking, or Cash on Delivery. 100% secure.
        </p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className='mt-2 font-semibold'>We're Here For You</p>
        <p className='text-gray-400'>
          Questions? Our friendly support team helps you in Hindi & English, 24/7.
        </p>
      </div>
    </div>
  )
}

export default OurPolicy
