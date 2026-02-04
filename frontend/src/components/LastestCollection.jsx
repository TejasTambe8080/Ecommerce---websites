import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { Title } from './Title.jsx'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
    </div>
  )
}

export default LatestCollection