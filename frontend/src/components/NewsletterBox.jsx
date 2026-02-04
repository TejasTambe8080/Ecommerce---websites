import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler =(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>
        Join the Cartiva Family & Get 20% Off!
      </p>

      <p className='text-gray-400 mt-3'>
        Subscribe now for exclusive deals, new arrivals, and special offers delivered straight to your inbox. Shop smart, save more!
      </p>

      <form  onSubmit={onSubmitHandler}  className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input
          className='w-full sm:flex-1 outline-none py-3'
          type='email'
          placeholder='Enter your email'
          required
        />

        <button
          type='submit'
          className='bg-black text-white text-xs px-8 py-3'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
