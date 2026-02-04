import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/Login.jsx'

export const backendURL = import.meta.env.VITE_BACKEND_URL || 'https://cartiva-ecommerce.onrender.com';
export const currency = '₹';
const App = () => {
const [token,setToken] = useState(localStorage.getItem('token') || '');

useEffect(() => {
localStorage.setItem('token',token);
},[token])

return (
<div className='bg-gray-50 min-h-screen'>
<ToastContainer />
{token === ""
? <Login setToken={setToken} />
: <>
<Navbar setToken={setToken}/>
<hr/>
<div className='flex w-full'>
<Sidebar />
<div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8'>
<Routes>
<Route path='/' element={<Navigate to="/add" replace />}/>
<Route path='/add' element={<Add token={token}/>}/>
<Route path='/list' element={<List token={token}/>}/>
<Route path='/orders' element={<Orders token={token}/>}/>
</Routes>
</div>
</div>
</>
}
</div>
)
}

export default App
