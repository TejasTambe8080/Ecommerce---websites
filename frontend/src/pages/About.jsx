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
          <p>Cartiva is made for Indian homes. We started with one simple goal — to give every Indian family access to quality products at honest prices. Whether you're a student on a budget, a busy professional, or a homemaker looking for the best deals, Cartiva makes shopping easy, secure, and affordable.</p>
          <p>Our platform is designed for the way Indians shop. Browse thousands of products by category, search for exactly what you need, add items to your cart or wishlist, and checkout smoothly with UPI, cards, or cash on delivery. Track your orders in real-time and view your complete order history anytime. We've built Cartiva to work beautifully on your phone or laptop — fast, reliable, and always secure.</p>
          <b className='text-gray-800'>Our Promise</b>
          <p>Shopping you can trust, value that matters. Every product is quality-checked, every transaction is secure, and every customer is treated like family. From metros to small towns, we deliver smiles across India with the same care and commitment. Your trust is our greatest reward.</p>
        </div>
      </div>
      
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Easy & Secure Shopping:</b>
          <p className='text-gray-600'>Create your account in seconds, browse products effortlessly, and enjoy a smooth checkout experience. Your data is protected with trusted security, and payments are 100% safe — whether you pay via UPI, cards, or choose Cash on Delivery.</p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Shop Anywhere, Anytime:</b>
          <p className='text-gray-600'>Cartiva works perfectly on mobile and desktop. Quick search, smart filters, wishlist, and cart — everything is designed for speed. Track your orders live and access your complete purchase history whenever you need it.</p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Value That Matters:</b>
          <p className='text-gray-600'>Genuine products, honest prices, and real value for your money. We work directly with trusted suppliers to bring you quality without the premium markup. Every rupee you spend here is worth it.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About
