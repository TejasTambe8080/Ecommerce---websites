import React from 'react'
import Title from '../components/Title.jsx'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox.jsx'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 '>
        <img  className='w-full md:max-w-[450px]' src={assets.contact_img} alt=""/>
        <div className='flex flex-col justify-center items-start gap-6 '>
      <p className='font-semibold text-xl text-gray-600 '>We're Here to Help</p>
      <p className='text-gray-500'>
  Cartiva Support Center<br />
  2nd Floor, Infinity Plaza<br />
  MG Road, Pune<br />
  Maharashtra 412203, India
</p>

      <p className='text-gray-500'>Call Us: +91 9006018080 <br/> Email: support@cartiva.com</p>
      <p className=' font-semibold text-xl text-gray-600'>Got Questions?</p>
      <p className='text-gray-600'>Our support team is available to assist you with orders, payments, returns, or any queries. We respond quickly and speak your language — because your satisfaction matters most.</p>
      <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all'>Get In Touch</button>
        </div>

      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
