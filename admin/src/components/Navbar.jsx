import React from 'react'
import Logo from './Logo'

const Navbar = ({ setToken }) => {
return (
<div className='flex items-center justify-between px-4 py-2'>
<Logo className='w-36' />
<button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
</div>
)
}

export default Navbar
