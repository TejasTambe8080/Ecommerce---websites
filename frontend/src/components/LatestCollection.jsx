import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'
import ProductItem from './ProductItem.jsx'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect (() => {
    setLatestProducts(products.slice(0,10));
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'FRESH'} text2={'ARRIVALS'} />
        <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
          Made for Indian homes. Browse our newest collection — handpicked styles, honest prices, and doorstep delivery across India. Find what you love, add to cart, and checkout in seconds!
        </p>
      </div>
      {/* Rendering Product */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'> 
            {latestProducts.map((item,index) => (
                <ProductItem key={item._id} id={item._id} image={item.images?.[0] || item.images} name={item.name} price={item.price} />
            ))}
        </div>  

    </div>
  )
}

export default LatestCollection
