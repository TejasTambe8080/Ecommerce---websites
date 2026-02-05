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
    console.log('ShopContext Init - Token from localStorage:', !!storedToken)
    return storedToken || ''
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

  // Check if user is authenticated - memoized for consistency
  const isAuthenticated = useCallback(() => {
    const storedToken = localStorage.getItem('token')
    const hasToken = !!(token || storedToken)
    console.log('isAuthenticated check:', hasToken, 'token:', !!token, 'stored:', !!storedToken)
    return hasToken
  }, [token])

  // Handle invalid token responses globally
  const handleTokenError = useCallback(() => {
    console.log('Token error - clearing auth')
    localStorage.removeItem('token')
    setTokenState('')
    setCartItems({})
  }, [])

  // Validate token on app load
  const validateToken = useCallback(async (authToken) => {
    if (!authToken) {
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
        setAuthLoading(false)
        return true
      } else {
        console.log('Token validation failed:', response.data.message)
        handleTokenError()
        setAuthLoading(false)
        return false
      }
    } catch (error) {
      console.log('Token validation error:', error)
      handleTokenError()
      setAuthLoading(false)
      return false
    }
  }, [backendURL, handleTokenError])

  // Initialize auth state on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      // Sync token state with localStorage
      if (token !== storedToken) {
        setTokenState(storedToken)
      }
      validateToken(storedToken)
    } else {
      setAuthLoading(false)
    }
  }, []) // Only run on mount

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
