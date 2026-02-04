import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { assets } from '../assets/assets'
import Title from '../components/Title.jsx'
import ProductItem from '../components/ProductItem.jsx'

const Collection = () => {
  const { products, showSearch, search } = useContext(ShopContext)

  const [showsFilter, setShowsFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const applyFilters = () => {
    let filtered = [...products]

    if (showSearch && search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      filtered = filtered.filter(item =>
        category.includes(item.category)
      )
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }

    if (sortType === 'low-high') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      filtered.sort((a, b) => b.price - a.price)
    }

    setFilterProducts(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [products, category, subCategory, sortType, search, showSearch])

  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowsFilter(!showsFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=''
            className={`w-4 sm:hidden ${showsFilter ? 'rotate-90' : ''}`}
          />
        </p>

        <div className={`border pl-5 py-3 mt-6 ${showsFilter ? '' : 'hidden'}`}>
          <p className='mb-3 font-medium'>CATEGORIES</p>
          {['Men', 'Women', 'Kids'].map(cat => (
            <label key={cat} className='flex gap-2 text-sm'>
              <input type='checkbox' value={cat} onChange={toggleCategory} />
              {cat}
            </label>
          ))}
        </div>

        <div className={`border pl-5 py-3 my-5 ${showsFilter ? '' : 'hidden'}`}>
          <p className='mb-3 font-medium'>TYPE</p>
          {['TopWear', 'BottomWear', 'Winterwear'].map(type => (
            <label key={type} className='flex gap-2 text-sm'>
              <input type='checkbox' value={type} onChange={toggleSubCategory} />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between mb-4'>
          <Title text1='ALL' text2='COLLECTIONS' />

          <select
            className='border px-2 text-sm'
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filterProducts.length > 0 ? (
            filterProducts.map(item => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.images?.[0] || item.images}
              />
            ))
          ) : (
            <p className='text-gray-500'>No products found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
