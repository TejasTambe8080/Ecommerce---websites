import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'
import { Link } from 'react-router-dom'

const BestSeller = () => {
  const { products, currency } = useContext(ShopContext)
  const [bestSellerProducts, setBestSellerProducts] = useState([])

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller)
    setBestSellerProducts(bestProduct.slice(0, 5))
  }, [products])

  return (
    <div className="my-8 sm:my-10 px-2 sm:px-0">
      <div className="text-center py-6 sm:py-8 text-2xl sm:text-3xl">
        <Title text1={'CUSTOMER'} text2={'FAVORITES'} />
        <p className="w-11/12 sm:w-3/4 m-auto text-xs sm:text-base text-gray-600">
          Value that matters! These top-rated picks are loved by thousands of Indian families.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
        {bestSellerProducts.map((item, index) => (
          <Link
            to={`/product/${item._id}`}
            key={index}
            className="group border border-gray-200 rounded-lg overflow-hidden
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={item.images?.[0] || item.images}
                alt={item.name}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-3 text-center">
              <h3 className="font-semibold text-sm sm:text-base group-hover:text-black">
                {item.name}
              </h3>
              <p className="text-gray-600 font-medium mt-1">
                {currency}{item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BestSeller
