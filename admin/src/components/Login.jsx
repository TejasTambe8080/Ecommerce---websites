import React, { useState } from 'react'
import axios from 'axios'
import { backendURL } from '../App.jsx'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${backendURL}/api/users/admin`,
        { email, password }
      )
      if (response.data.success) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Login failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
              className='w-full px-3 py-2 border rounded-md'
              placeholder='admin@example.com'
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              className='w-full px-3 py-2 border rounded-md'
              placeholder='Enter password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
