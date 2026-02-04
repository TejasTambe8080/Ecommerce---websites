import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [delivery_fee, setDeliveryFee] = useState(0);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    console.log('=== ADD TO CART ===');
    console.log('itemId:', itemId, 'size:', size);
    
    if (!size) {
      toast.error("Please select a size")
      return;
    }
    
    let cartData = structuredClone(cartItems);
    console.log('Current cartItems:', cartItems);
    
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    
    console.log('New cartData:', cartData);
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const getCardAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product) => product.id === parseInt(items));
      
      if(!itemInfo) continue;
      
      for(const item in cartItems[items]){
        try{
          if(cartItems[items][item] > 0){
            totalAmount += cartItems[items][item] * itemInfo.price;
          }
        }catch(err){
          // Handle error if needed
        }
      }
    }
    return totalAmount;
  }

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      // Add other product details as needed
    },
    {
      id: 2,
      name: "Product 2",
      price: 15,
      // Add other product details as needed
    },
    // Add more products as needed
  ];

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
    getCardAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};