import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-gray-700'>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='mt-2 font-semibold'>Easy Exchange & Returns</p>
        <p className='text-gray-400'>
          No tension! Easy exchanges within 7 days, no questions asked.
        </p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='mt-2 font-semibold'>100% Genuine Products</p>
        <p className='text-gray-400'>
          Only authentic, quality-checked products. Your trust is our priority.
        </p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className='mt-2 font-semibold'>Dedicated Support Team</p>
        <p className='text-gray-400'>
          Our friendly team is here to help you 24/7 in Hindi & English.
        </p>
      </div>
    </div>
  )
}

export default OurPolicy
