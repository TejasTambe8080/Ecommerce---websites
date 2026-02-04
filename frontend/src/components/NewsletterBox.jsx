import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewsletterBox = () => {
    const [email, setEmail] = useState('')
    
    const onSubmitHandler = (event) => {
        event.preventDefault()
        if (email) {
            toast.success('Thanks for subscribing! You will receive 20% off on your first order.')
            setEmail('')
        }
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>
        Flat 20% Off on Your First Order!
      </p>

      <p className='text-gray-400 mt-3'>
        Join lakhs of happy Indian shoppers. Get exclusive deals, early access to sales, and new arrivals straight to your inbox. Value that matters, delivered to you.
      </p>

      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input
          className='w-full sm:flex-1 outline-none py-3'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type='submit'
          className='bg-black text-white text-xs px-8 py-3 hover:bg-gray-800 transition-all'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
