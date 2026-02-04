import React from 'react'
import { Link } from 'react-router-dom'

// High-quality hero image for ecommerce
const heroImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'

const Hero = () => {
  return (
    <div className='relative overflow-hidden'>
      {/* Desktop Layout */}
      <div className='hidden sm:flex flex-row min-h-[550px] lg:min-h-[600px]'>
        {/* Left Content - Desktop */}
        <div className='w-1/2 flex items-center justify-center py-12 px-8 lg:px-16 bg-gradient-to-br from-orange-50 via-white to-green-50'>
          <div className='text-[#414141] max-w-lg'>
            <div className='flex items-center gap-2 mb-4'>
              <p className='w-11 h-[2px] bg-orange-500'></p>
              <p className='font-medium text-sm tracking-wider text-orange-600'>MADE FOR INDIAN HOMES</p>
            </div>

            <h1 className='prata-regular text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4'>
              Smart Shopping <br/>
              <span className='text-gray-800'>Made for </span>
              <span className='text-orange-500'>India</span>
            </h1>
            
            <p className='text-gray-500 text-base lg:text-lg mb-8 leading-relaxed'>
              Trusted products, affordable prices, and smooth online shopping for everyday Indian needs.
            </p>
            
            {/* Buttons */}
            <div className='flex flex-row gap-4 mb-8'>
              <Link to='/collection' className='bg-orange-500 text-white px-8 py-4 text-sm font-semibold rounded-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
                Shop Now
              </Link>
              <Link to='/collection' className='border-2 border-gray-800 text-gray-800 px-8 py-4 text-sm font-semibold rounded-lg hover:bg-gray-800 hover:text-white transition-all'>
                Browse Categories
              </Link>
            </div>

            {/* Trust Badges */}
            <div className='flex flex-wrap items-center gap-6 text-sm text-gray-600'>
              <div className='flex items-center gap-2'>
                <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
                </svg>
                <span>Secure Payments</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
                </svg>
                <span>Fast Delivery</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
                </svg>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image - Desktop */}
        <div className='w-1/2 relative'>
          <img 
            className='w-full h-full object-cover object-center' 
            src={heroImage}
            alt='Fashion Shopping - Made for India' 
          />
          {/* Decorative overlay */}
          <div className='absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-orange-50/30'></div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='sm:hidden relative'>
        {/* Background Image */}
        <div className='relative h-[60vh] min-h-[450px]'>
          <img 
            className='w-full h-full object-cover object-top' 
            src={heroImage}
            alt='Fashion Shopping - Made for India' 
          />
          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent'></div>
        </div>
        
        {/* Content Overlay */}
        <div className='absolute bottom-0 left-0 right-0 p-5 text-white'>
          <div className='flex items-center gap-2 mb-2'>
            <p className='w-6 h-[2px] bg-orange-400'></p>
            <p className='font-medium text-xs tracking-wider text-orange-300'>MADE FOR INDIAN HOMES</p>
          </div>

          <h1 className='prata-regular text-2xl leading-tight mb-2'>
            Smart Shopping <span className='text-orange-400'>for India</span>
          </h1>
          
          <p className='text-gray-300 text-sm mb-4'>
            Trusted products at affordable prices.
          </p>
          
          {/* Buttons - Side by Side on Mobile */}
          <div className='flex flex-row gap-2 mb-3'>
            <Link to='/collection' className='flex-1 text-center bg-orange-500 text-white px-4 py-3 text-sm font-semibold rounded-lg hover:bg-orange-600 transition-all'>
              Shop Now
            </Link>
            <Link to='/collection' className='flex-1 text-center border-2 border-white/80 text-white px-4 py-3 text-sm font-semibold rounded-lg hover:bg-white hover:text-black transition-all'>
              Categories
            </Link>
          </div>

          {/* Trust Badges - Mobile */}
          <div className='flex items-center justify-center gap-4 text-xs text-gray-300'>
            <span className='flex items-center gap-1'>
              <svg className='w-3 h-3 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
              </svg>
              Secure
            </span>
            <span className='flex items-center gap-1'>
              <svg className='w-3 h-3 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
              </svg>
              Fast Delivery
            </span>
            <span className='flex items-center gap-1'>
              <svg className='w-3 h-3 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
              </svg>
              Easy Returns
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero