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
          <p>Cartiva was born from a simple idea — to make quality products accessible and affordable for every Indian family. Whether you're a college student looking for trendy fashion, a homemaker shopping for the family, or a professional who values convenience, Cartiva is built for you. We understand the needs of Indian shoppers — great value, genuine products, and reliable service.</p>
          <p>At Cartiva, we don't just sell products; we build relationships. Every order is packed with care, every delivery is tracked, and every customer is treated like family. From metros to small towns, we're proud to serve customers across India with the same dedication and trust. Your satisfaction is not just our goal — it's our promise.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To empower every Indian shopper with a seamless, trustworthy, and affordable online shopping experience. We believe good quality shouldn't come with a heavy price tag. That's why we work hard to bring you the best products at honest prices, with fast delivery and friendly support — because you deserve nothing less.</p>
        </div>
      </div>
      
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Genuine Quality, Always:</b>
          <p className='text-gray-600'>Every product on Cartiva goes through strict quality checks. We partner only with trusted suppliers so you get authentic, durable products that are worth every rupee you spend. No fake products, no compromise — just genuine quality.</p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Shop Anytime, Anywhere:</b>
          <p className='text-gray-600'>Whether you're on your phone during a chai break or browsing on laptop at night, Cartiva works smoothly everywhere. With easy navigation, multiple payment options including UPI, COD, and cards, shopping has never been this convenient.</p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Customer First, Always:</b>
          <p className='text-gray-600'>Got a question? Need help with an order? Our dedicated support team is just a message away. We speak your language, understand your concerns, and resolve issues quickly — because happy customers are our biggest reward.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About
