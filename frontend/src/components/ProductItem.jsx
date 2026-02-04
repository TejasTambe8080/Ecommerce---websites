import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { Link } from 'react-router-dom'


const ProductItem = ({id,image,name,price}) => {
    const {currency} = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden bg-gray-200 w-full h-48'>
            <img className='w-full h-full object-cover hover:scale-110 transition ease-in-out' src={image} alt={name}/>
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='font-medium text-sm'>{currency}{price}</p>
    </Link>
      
    
  )
}

export default ProductItem
