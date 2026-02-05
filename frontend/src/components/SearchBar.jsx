import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'
import { assets } from '../assets/assets'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Show search bar only on collection page
    if (location.pathname.includes('collection')) {
      setVisible(true)
    } else {
      setVisible(false)
      // Don't reset showSearch here - let Navbar handle navigation
    }
  }, [location.pathname])

  // Only render if on collection page and showSearch is true
  if (!visible || !showSearch) return null

  return (
    <div className='border-t border-b bg-gray-50 text-center py-3'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-2 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm w-full'
          type="text"
          placeholder="Search products..."
          autoFocus
        />
        <img className="w-4" src={assets.search_icon} alt="search" />
      </div>

      <img
        className='inline w-3 cursor-pointer ml-2'
        src={assets.cross_icon}
        alt="close"
        onClick={() => {
          setShowSearch(false)
          setSearch('')
        }}
      />
    </div>
  )
}

export default SearchBar
