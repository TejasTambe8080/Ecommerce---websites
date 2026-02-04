import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext.jsx'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendURL } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(
          backendURL + '/api/users/register',
          { name, email, password }
        )

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(
          backendURL + '/api/users/login',
          { email, password }
        )

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      toast.error('Authentication failed')
    }
  }

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }

    if (token) {
      navigate('/')
    }
  }, [token, navigate, setToken])

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 border-t pt-10'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      <div className='flex flex-col gap-4 w-full mb-10 bg-gradient-to-r from-orange-50 to-green-50 p-6 rounded-lg'>
        {currentState === 'Sign Up' && (
          <input
            onChange={(e) => setName(e.target.value)}
            className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-500'
            type='text'
            placeholder='Name'
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-500'
          placeholder='Email'
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-500'
          placeholder='Password'
          required
        />

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password?</p>

          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className='cursor-pointer'
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className='cursor-pointer'
            >
              Login Here
            </p>
          )}
        </div>

        <button className='bg-black text-white font-medium px-8 py-3 mt-4 hover:bg-gray-800 transition-all rounded'>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </form>
  )
}

export default Login
