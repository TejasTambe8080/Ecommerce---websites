import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
return (
<div className='flex items-center justify-between px-4'>
<img src={assets.logo} alt="" />
<button onClick={()=>setToken('')}>Logout</button>
</div>
)
}

export default Navbar
