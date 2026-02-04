import React from 'react'
import Title from '../components/Title.jsx'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox.jsx'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Our Forever is a modern e-commerce platform built with a clear purpose: to make quality, style, and reliability accessible to everyone. We curate a diverse range of products that balance contemporary design with everyday practicality, ensuring that each item meets our standards for value and durability. From browsing to checkout, our platform is designed to deliver a smooth, secure, and intuitive shopping experience across all devices.</p>
          <p>At Our Forever, we believe in long-term relationships, not one-time transactions. We are committed to transparent pricing, dependable delivery, and responsive customer support, so our customers can shop with confidence. As we continue to grow, our focus remains on innovation, trust, and consistency—creating an online marketplace that customers return to, time and again.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to provide a seamless and trustworthy online shopping experience by offering high-quality products, transparent pricing, and reliable service. We strive to continuously improve our platform through innovation and customer-focused design, ensuring convenience, security, and satisfaction at every step of the journey.</p>
        </div>
      </div>
      
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We ensure that every product listed on Our Forever meets strict quality standards. Our team carefully selects items that combine durability, functionality, and style, providing customers with reliable choices that stand the test of time.</p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Our platform is designed to provide a seamless and user-friendly shopping experience. With intuitive navigation, multiple payment options, and responsive customer support, we make it easy for customers to find and purchase what they need, anytime and anywhere.</p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Services:</b>
          <p className='text-gray-600'>We prioritize our customers by offering responsive and helpful support throughout their shopping journey. Our dedicated team is available to assist with inquiries, resolve issues promptly, and ensure a positive experience from start to finish.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About
