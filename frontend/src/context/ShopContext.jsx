import { createContext, useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
  const currency = '₹'
  const delivery_fee = 10
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'https://cartiva-ecommerce.onrender.com'
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const [products, setProducts] = useState([])
  
  // ========================================
  // AUTH STATE - Initialize from localStorage
  // ========================================
  const [token, setTokenState] = useState(() => {
    const storedToken = localStorage.getItem('token')
    // Validate stored token - clean up invalid values
    if (storedToken && storedToken !== 'undefined' && storedToken !== 'null') {
      return storedToken
    }
    localStorage.removeItem('token')
    return ''
  })
  
  // Loading state for auth initialization
  const [authLoading, setAuthLoading] = useState(true)

  // Custom setToken that also updates localStorage
  const setToken = useCallback((newToken) => {
    console.log('setToken called with:', !!newToken)
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
    setTokenState(newToken)
  }, [])

  // Derived auth state - simple boolean that updates whenever token changes
  // NOT a function — use as: isAuthenticated (not isAuthenticated())
  const isAuthenticated = !!(token && token !== 'undefined' && token !== 'null')

  // Handle invalid token responses globally
  const handleTokenError = useCallback(() => {
    console.log('Token error - clearing auth')
    localStorage.removeItem('token')
    setTokenState('')
    setCartItems({})
  }, [])

  // Validate token on app load - ONLY clear token on explicit rejection
  const validateToken = useCallback(async (authToken) => {
    if (!authToken || authToken === 'undefined' || authToken === 'null') {
      console.log('No valid token to validate')
      localStorage.removeItem('token')
      setTokenState('')
      setAuthLoading(false)
      return false
    }
    
    try {
      // Make a lightweight API call to validate token
      const response = await axios.get(
        `${backendURL}/api/users/profile`,
        { headers: { token: authToken } }
      )
      
      if (response.data.success) {
        console.log('Token validated successfully')
        // Ensure token is synced to state
        setTokenState(authToken)
        setAuthLoading(false)
        return true
      } else {
        // Only clear token if backend explicitly says it's invalid
        const message = response.data.message || ''
        if (message.includes('Invalid token') || message.includes('Not Authorized') || message.includes('jwt') || message.includes('expired')) {
          console.log('Token explicitly rejected by server:', message)
          handleTokenError()
        } else {
          // Other errors (like user not found) - keep token, let UI handle
          console.log('Profile fetch failed but token may be valid:', message)
        }
        setAuthLoading(false)
        return false
      }
    } catch (error) {
      // Network error - DO NOT clear token, just log and continue
      // User might be offline or backend might be temporarily down
      console.log('Token validation network error (keeping token):', error.message)
      setAuthLoading(false)
      // Return true to keep user logged in during network issues
      return true
    }
  }, [backendURL, handleTokenError])

  // Token is already loaded from localStorage synchronously in useState initializer
  // Just mark auth loading as complete after first render
  useEffect(() => {
    setAuthLoading(false)
  }, [])

  // ========================================
  // CART FUNCTIONS
  // ========================================
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error('Please select a size')
      return
    }

    let cartData = structuredClone(cartItems)

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    setCartItems(cartData)
    toast.success('Added to cart')

    const authToken = token || localStorage.getItem('token')
    if (authToken) {
      try {
        axios.post(
          backendURL + '/api/cart/add',
          { itemId, size },
          { headers: { token: authToken } }
        )
      } catch (error) {
        console.log('Error in adding to cart on backend', error)
      }
    }
  }

  const getuserCart = async (userToken) => {
    try {
      const response = await axios.post(
        backendURL + '/api/cart/get',
        {},
        { headers: { token: userToken } }
      )

      if (response.data.success) {
        setCartItems(response.data.cartData)
      } else {
        if (response.data.message === 'Invalid token' || response.data.message === 'Not Authorized. Login again') {
          handleTokenError()
        }
      }
    } catch (error) {
      console.log('Error fetching cart:', error)
    }
  }

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity
    setCartItems(cartData)
  }

  const getCardCount = () => {
    let totalCount = 0
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item]
        }
      }
    }
    return totalCount
  }

  const getCardAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items)
      if (!itemInfo) continue
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += cartItems[items][item] * itemInfo.price
        }
      }
    }
    return totalAmount
  }

  // ========================================
  // PRODUCTS
  // ========================================
  const getProductDta = async () => {
    try {
      const response = await axios.get(backendURL + '/api/products/list')
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Failed to fetch products')
    }
  }

  // ========================================
  // EFFECTS
  // ========================================
  useEffect(() => {
    getProductDta()
  }, [])

  // Load cart when token changes
  useEffect(() => {
    const authToken = token || localStorage.getItem('token')
    if (authToken) {
      getuserCart(authToken)
    }
  }, [token])

  useEffect(() => {
    console.log('Cart Items Updated:', cartItems)
  }, [cartItems])

  // ========================================
  // CONTEXT VALUE
  // ========================================
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCardCount,
    getCardAmount,
    getCartAmount: getCardAmount,
    backendURL,
    setToken,
    token,
    isAuthenticated,
    authLoading,
    setCartItems,
    navigate,
    handleTokenError,
    validateToken
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
