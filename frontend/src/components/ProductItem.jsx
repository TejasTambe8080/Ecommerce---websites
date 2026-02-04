import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { Link } from 'react-router-dom'


const ProductItem = ({id,image,name,price}) => {
    const {currency} = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className='group text-gray-700 cursor-pointer block'>
        <div className='overflow-hidden bg-gray-100 w-full aspect-square rounded-lg shadow-sm'>
            <img 
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out' 
              src={image} 
              alt={name}
              loading='lazy'
            />
        </div>
        <div className='p-2'>
          <p className='pt-2 pb-1 text-xs sm:text-sm text-gray-800 font-medium line-clamp-2'>{name}</p>
          <p className='font-semibold text-sm sm:text-base text-orange-600'>{currency}{price}</p>
        </div>
    </Link>
  )
}

export default ProductItem
