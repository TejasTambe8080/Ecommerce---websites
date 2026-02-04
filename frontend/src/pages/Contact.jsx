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
      <p className='font-semibold text-xl text-gray-600 '>Our Store</p>
      <p className='text-gray-500'>
  Cartiva Store<br />
  2nd Floor, Infinity Plaza<br />
  MG Road, Andheri East<br />
  Pune, Maharashtra 412203<br />
  India
</p>

      <p className='text-gray-500'>Tel:+91 9006018080 <br/> Email:contact@cartiva.com</p>
      <p className=' font-semibold text-xl text-gray-600'>Careers at Cartiva</p>
      <p className='text-gray-600'>Learn more about out teams and job openings.</p>
      <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white'>Explore Jobs</button>
        </div>

      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
