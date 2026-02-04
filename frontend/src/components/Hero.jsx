import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 w-full'>
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>MADE FOR INDIAN HOMES</p>
          </div>

          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Shopping You Can Trust</h1>
          
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link to='/login' className='bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-all text-center'>
              SHOP NOW
            </Link>
            <Link to='/collection' className='border border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all text-center'>
              BROWSE CATEGORIES
            </Link>
          </div>
        </div>
      </div>

      <div className='w-full sm:w-1/2 flex items-center justify-center'>
        <img className='w-full h-auto object-cover' src={assets.hero_img} alt='hero' />
      </div>
    </div>
  )
}

export default Hero