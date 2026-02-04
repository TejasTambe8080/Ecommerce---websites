import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { fetchProductById } from '../api/products';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [size, setSize] = useState('');

  const productData = fetchProductById(id);

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = () => {
    if (size) {
      dispatch(addToCart({ id: productData.id, size }));
    } else {
      alert('Please select a size');
    }
  };

  return (
    <div className="product-page">
      <h1>{productData.name}</h1>
      <img src={productData.imageUrl} alt={productData.name} />
      <p>{productData.description}</p>
      <p>${productData.price}</p>
      <div>
        <label htmlFor="size">Select Size:</label>
        <select id="size" value={size} onChange={handleSizeChange}>
          <option value="">--Please choose an option--</option>
          {productData.sizes.map((availableSize) => (
            <option key={availableSize} value={availableSize}>
              {availableSize}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddToCart} className="bg-black text-white px-6 py-3 hover:bg-gray-800">
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductPage;