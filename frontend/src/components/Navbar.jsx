import React, { useState, useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'
import Logo from './Logo'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const { setShowSearch, getCardCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext)
  
  // Also check localStorage for token (in case context hasn't loaded yet)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setIsLoggedIn(!!(token || storedToken))
  }, [token])

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    setShowDropdown(false)
    navigate('/login')
  }
  
  const handleProfileClick = () => {
    const storedToken = localStorage.getItem('token')
    if (token || storedToken) {
      setShowDropdown(!showDropdown)
    } else {
      navigate('/login')
    }
  }
  
  const goToProfile = () => {
    setShowDropdown(false)
    navigate('/profile')
  }
  
  const goToOrders = () => {
    setShowDropdown(false)
    navigate('/orders')
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-dropdown')) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="flex items-center justify-between p-5 font-medium relative">
      {/* Logo */}
      <Link to="/">
        <Logo className="w-36" />
      </Link>

      {/* Desktop links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
      </ul>

      {/* Right icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true)
            navigate('/collection')
          }}
          src={assets.search_icon}
          alt="search"
          className="w-5 cursor-pointer"
        />

        <div className="group relative profile-dropdown">
          <img
            onClick={handleProfileClick}
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          />

          {/* Drop down - now using click instead of hover */}
          {isLoggedIn && showDropdown && (
            <div className="absolute right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-40 py-3 px-5 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-600">
                <p
                  onClick={goToProfile}
                  className="cursor-pointer hover:text-orange-600 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </p>
                <p
                  onClick={goToOrders}
                  className="cursor-pointer hover:text-orange-600 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Orders
                </p>
                <hr className="border-gray-200" />
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-red-600 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="cart"
            className="w-5 min-w-5 cursor-pointer"
          />
          <p className="absolute right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[-8px]">
            {getCardCount()}
          </p>
        </Link>

        {/* Menu icon (mobile) */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar overlay + menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          visible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="back"
            />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>

          {token && (
            <>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/profile"
              >
                MY PROFILE
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/orders"
              >
                MY ORDERS
              </NavLink>
              <div
                onClick={() => {
                  setVisible(false);
                  logout();
                }}
                className="py-2 pl-6 border cursor-pointer text-red-600"
              >
                LOGOUT
              </div>
            </>
          )}

          {!token && (
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/login"
            >
              LOGIN
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
