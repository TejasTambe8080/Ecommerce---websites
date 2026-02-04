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
      <p className='font-semibold text-xl text-gray-600 '>Visit Our Office</p>
      <p className='text-gray-500'>
  Cartiva Headquarters<br />
  2nd Floor, Infinity Plaza<br />
  MG Road, Andheri East<br />
  Pune, Maharashtra 412203<br />
  India
</p>

      <p className='text-gray-500'>Phone: +91 9006018080 <br/> Email: contact@cartiva.com</p>
      <p className=' font-semibold text-xl text-gray-600'>Join Our Team</p>
      <p className='text-gray-600'>Want to be part of India's growing e-commerce story? We're always looking for passionate people to join the Cartiva family.</p>
      <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all'>View Open Positions</button>
        </div>

      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
