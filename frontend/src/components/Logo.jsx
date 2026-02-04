import React from 'react'

const Logo = ({ className = "w-36" }) => {
  return (
    <div className={`${className} flex items-center`}>
      <svg viewBox="0 0 180 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Shopping cart icon */}
        <g fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="40" r="4" fill="#4F46E5"/>
          <circle cx="38" cy="40" r="4" fill="#4F46E5"/>
          <path d="M6 10 L12 10 L18 32 L42 32 L48 14 L15 14"/>
        </g>
        {/* Cartiva text */}
        <text x="55" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#111827">
          Cartiva
        </text>
      </svg>
    </div>
  )
}

export default Logo
