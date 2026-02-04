import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import Logo from './Logo'

const Footer = () => {
  return (
    <div className="mt-40">

      {/* TOP FOOTER CONTENT */}
      <div className="flex flex-col sm:flex-row justify-between gap-14 text-sm">

        {/* LEFT SECTION */}
        <div className="sm:w-1/2">
          <Logo className="w-32 mb-5" />
          <p className="text-gray-600 w-full md:w-2/3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
            <li><Link to="/collection" className="hover:text-black transition-colors">Delivery</Link></li>
            <li><Link to="/contact" className="hover:text-black transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* GET IN TOUCH */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li><a href="tel:+919006018080" className="hover:text-black transition-colors">+91 9006018080</a></li>
            <li><a href="mailto:contact@cartiva.com" className="hover:text-black transition-colors">contact@cartiva.com</a></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="mt-10">
        <hr />
        <p className="text-gray-600 text-sm mt-5 text-center">
          Copyright © 2024 Cartiva.com All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer
