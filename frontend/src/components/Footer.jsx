import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="mt-40">

      {/* TOP FOOTER CONTENT */}
      <div className="flex flex-col sm:flex-row justify-between gap-14 text-sm">

        {/* LEFT SECTION */}
        <div className="sm:w-1/2">
          <img src={assets.logo} alt="logo" className="w-32 mb-5" />
          <p className="text-gray-600 w-full md:w-2/3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* GET IN TOUCH */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 9006018080</li>
            <li>contact@forever.com</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="mt-10">
        <hr />
        <p className="text-gray-600 text-sm mt-5 text-center">
          Copyright © 2024 Forever.com All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer
