import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts.jsx'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)

  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item)

        if (Array.isArray(item.images)) {
          setImage(item.images[0])
        } else {
          setImage(item.images)
        }
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        <div className='flex gap-4 flex-1 flex-col-reverse sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal'>
            {(Array.isArray(productData.images)
              ? productData.images
              : [productData.images]
            ).map((img, index) => (
              <img
                onClick={() => setImage(img)}
                key={index}
                src={img}
                alt=''
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
              />
            ))}
          </div>

          <div className='w-full sm:w-[80%]'>
            <img src={image} alt='' className='w-full h-auto' />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='text-3xl font-medium mt-2'>{productData.name}</h1>

          <div className='flex mt-2 items-center gap-1'>
            <img src={assets.star_icon} className="w-3" alt="star" />
            <img src={assets.star_icon} className="w-3" alt="star" />
            <img src={assets.star_icon} className="w-3" alt="star" />
            <img src={assets.star_icon} className="w-3" alt="star" />
            <img src={assets.star_dull_icon} className="w-3" alt="star" />
            <p className='pl-2'>(122)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>
            {currency}{productData.price}
          </p>

          <p className='mt-5 text-gray-500 md:w-4/5'>
            {productData.description || 'No description available.'}
          </p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {(productData.Sizes || productData.size || ['S', 'M', 'L', 'XL']).map((item) => (
                <button
                  onClick={() => setSize(item)}
                  key={item}
                  className={`border border-gray-300 px-4 py-2 hover:bg-gray-100 ${
                    size === item ? 'bg-gray-200' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-6 py-3 hover:bg-gray-800'>
            ADD TO CART
          </button>

          <hr className='my-10 mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex-col flex gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>
            At Cartiva, we bring you quality products made for Indian homes. 
            Every item is carefully selected to ensure the best value and durability.
          </p>
          <p>
            Shop with confidence - we offer easy returns, cash on delivery, 
            and fast shipping across India.
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subcategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className='opacity-0'></div>
  )
}

export default Product
