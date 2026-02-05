import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext.jsx'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendURL, isAuthenticated } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect to home if already logged in - check on mount only
  useEffect(() => {
    if (isAuthenticated()) {
      console.log('Login: User already authenticated, redirecting to home')
      navigate('/')
    }
  }, []) // Empty dependency - only check on mount

  // Clear form when switching between Login and Sign Up
  const handleStateChange = (newState) => {
    setName('')
    setEmail('')
    setPassword('')
    setCurrentState(newState)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(
          backendURL + '/api/users/register',
          { name, email: email.toLowerCase().trim(), password }
        )

        if (response.data.success) {
          setToken(response.data.token)
          toast.success('Account created successfully!')
          navigate('/') // Navigate after successful signup
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(
          backendURL + '/api/users/login',
          { email: email.toLowerCase().trim(), password }
        )

        if (response.data.success) {
          setToken(response.data.token)
          toast.success('Login successful!')
          navigate('/') // Navigate after successful login
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log('Auth error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-500'
            type='text'
            placeholder='Name'
            required
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-500'
          placeholder='Email'
          required
        />

        <input
          value={password}
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
              onClick={() => handleStateChange('Sign Up')}
              className='cursor-pointer text-orange-600 hover:underline'
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => handleStateChange('Login')}
              className='cursor-pointer text-orange-600 hover:underline'
            >
              Login Here
            </p>
          )}
        </div>

        <button 
          disabled={loading}
          className='bg-black text-white font-medium px-8 py-3 mt-4 hover:bg-gray-800 transition-all rounded disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          {loading ? 'Please wait...' : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
        </button>
      </div>
    </form>
  )
}

export default Login
