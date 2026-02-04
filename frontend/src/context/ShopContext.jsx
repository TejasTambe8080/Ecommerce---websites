import { createContext, useEffect, useState } from 'react'
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
  const [token, setToken] = useState('')

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

    if (token) {
      try {
        axios.post(
          backendURL + '/api/cart/add',
          { itemId, size },
          { headers: { token } }
        )
      } catch (error) {
        console.log('Error in adding to cart on backend', error)
        toast.error('Failed to sync cart with server')
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
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Failed to fetch cart data')
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

  const getCardAmount = () => {
    let totalAmount = 0

    for (const items in cartItems) {
      const itemInfo = products.find(
        (product) => product._id === items
      )

      if (!itemInfo) continue

      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += cartItems[items][item] * itemInfo.price
        }
      }
    }
    return totalAmount
  }

  useEffect(() => {
    getProductDta()
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getuserCart(localStorage.getItem('token'))
    }
  }, [])

  useEffect(() => {
    console.log('Cart Items Updated:', cartItems)
  }, [cartItems])

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
    setCartItems,
    navigate
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
