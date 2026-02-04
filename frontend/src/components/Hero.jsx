import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-300 bg-gradient-to-r from-orange-50 via-white to-green-50'>
      {/* Left Content */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141] px-6 sm:px-10'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>MADE FOR INDIAN HOMES</p>
          </div>

          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Shopping You Can Trust</h1>
          
          <p className='text-gray-500 text-sm md:text-base mt-2 mb-6'>
            Quality products at honest prices, delivered to your doorstep across India.
          </p>
          
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link to='/login' className='flex items-center justify-center gap-2 bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-all'>
              SHOP NOW
              <span className='w-8 md:w-11 h-[1px] bg-white'></span>
            </Link>
            <Link to='/collection' className='flex items-center justify-center gap-2 border-2 border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all'>
              BROWSE CATEGORIES
            </Link>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className='w-full sm:w-1/2'>
        <img className='w-full h-full object-cover' src={assets.hero_img} alt='Cartiva - Made for Indian Homes' />
      </div>
    </div>
  )
}

export default Hero