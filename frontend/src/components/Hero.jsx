import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='relative border border-gray-300 overflow-hidden'>
      {/* Desktop Layout */}
      <div className='hidden sm:flex flex-row bg-gradient-to-r from-orange-50 via-white to-green-50'>
        {/* Left Content - Desktop */}
        <div className='w-1/2 flex items-center justify-center py-16'>
          <div className='text-[#414141] px-10'>
            <div className='flex items-center gap-2'>
              <p className='w-11 h-[2px] bg-[#414141]'></p>
              <p className='font-medium text-base'>MADE FOR INDIAN HOMES</p>
            </div>

            <h1 className='prata-regular text-4xl lg:text-5xl py-3 leading-relaxed'>Shopping You Can Trust</h1>
            
            <p className='text-gray-500 text-base mt-2 mb-6'>
              Quality products at honest prices, delivered to your doorstep across India.
            </p>
            
            <div className='flex flex-row gap-4'>
              <Link to='/collection' className='flex items-center justify-center gap-2 bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-all'>
                SHOP NOW
                <span className='w-11 h-[1px] bg-white'></span>
              </Link>
              <Link to='/collection' className='flex items-center justify-center gap-2 border-2 border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all'>
                BROWSE CATEGORIES
              </Link>
            </div>
          </div>
        </div>

        {/* Right Image - Desktop */}
        <div className='w-1/2'>
          <img className='w-full h-full object-cover' src={assets.hero_img} alt='Cartiva - Made for Indian Homes' />
        </div>
      </div>

      {/* Mobile Layout - Image with Overlay */}
      <div className='sm:hidden relative'>
        {/* Background Image */}
        <div className='relative h-[70vh] min-h-[500px]'>
          <img 
            className='w-full h-full object-cover' 
            src={assets.hero_img} 
            alt='Cartiva - Made for Indian Homes' 
          />
          {/* Dark Overlay for better text visibility */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent'></div>
        </div>
        
        {/* Content Overlay - Bottom */}
        <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
          <div className='flex items-center gap-2 mb-2'>
            <p className='w-8 h-[2px] bg-white'></p>
            <p className='font-medium text-xs'>MADE FOR INDIAN HOMES</p>
          </div>

          <h1 className='prata-regular text-2xl leading-tight mb-2'>Shopping You Can Trust</h1>
          
          <p className='text-gray-200 text-sm mb-4'>
            Quality products at honest prices, delivered across India.
          </p>
          
          {/* Buttons - Stacked on Mobile */}
          <div className='flex flex-col gap-3'>
            <Link to='/collection' className='flex items-center justify-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-gray-100 transition-all'>
              SHOP NOW
              <span className='w-6 h-[1px] bg-black'></span>
            </Link>
            <Link to='/collection' className='flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-black transition-all'>
              BROWSE CATEGORIES
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero