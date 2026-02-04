import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendURL } from '../App.jsx'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

const [image1,setImage1]=useState(false);
const [image2,setImage2]=useState(false);
const [image3,setImage3]=useState(false);
const [image4,setImage4]=useState(false);

const [name,setName]=useState('');
const [description,setDescription]=useState('');
const [category,setCategory]=useState("Men");
const [subCategory,setSubCategory]=useState("TopWear");
const [price,setPrice]=useState(0);
const [sizes,setSizes]=useState([]);
const [isBestSeller,setIsBestSeller]=useState(false);

const onSubmitHandler = async(e) =>{
e.preventDefault();
try{
  const formData = new FormData();
  image1 && formData.append('image1',image1);
  image2 && formData.append('image2',image2);
  image3 && formData.append('image3',image3);
  image4 && formData.append('image4',image4);

  formData.append('name',name);
  formData.append('description',description);
  formData.append('category',category);
  formData.append('subCategory',subCategory);
  formData.append('price',price);
  formData.append('Sizes',JSON.stringify(sizes));
  formData.append('bestSeller',isBestSeller);

  const response = await axios.post(
    `${backendURL}/api/products/add`,
    formData,
    { headers:{ token } }
  );

if(response.data.success){
  toast.success(response.data.message)
  setName('');
  setDescription('');
  setCategory('Men');
  setSubCategory('TopWear');
  setPrice(0);
  setSizes([]);
  setIsBestSeller(false);
  setImage1(false);
  setImage2(false);
  setImage3(false);
  setImage4(false);
}else{
  toast.error(response.data.message);
}
}
catch(error){
  console.log("Error in adding product",error);
}
}

return (
<div>
<form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
<div>
<p className='mb-2'>Upload Image</p>
<div className='flex gap-2'>
<label htmlFor="image1">
<img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
<input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
</label>
<label htmlFor="image2">
<img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
<input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
</label>
<label htmlFor="image3">
<img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
<input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
</label>
<label htmlFor="image4">
<img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
<input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
</label>
</div>
</div>

<div className='w-full'>
<p className='mb-2'>Product Name</p>
<input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" />
</div>

<div className='w-full'>
<p className='mb-2'>Product Description</p>
<textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2'/>
</div>

<div>
<p className='mb-2'>Product Category</p>
<select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
<option value="Men">Men</option>
<option value="Women">Women</option>
<option value="Kids">Kids</option>
</select>

<p className='mb-2'>Sub Category</p>
<select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
<option value="TopWear">TopWear</option>
<option value="BottomWear">BottomWear</option>
<option value="Winterwear">Winterwear</option>
</select>

<p className='mb-2'>Product Price</p>
<input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number"/>
</div>

<div className='mt-4'>
<p className='mb-2'>Product Sizes</p>
<div className='flex gap-3'>
{['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
<div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])} className={`px-3 py-1 cursor-pointer border ${sizes.includes(size) ? 'bg-pink-100 border-pink-300' : 'bg-gray-100'}`}>{size}</div>
))}
</div>
</div>

<div className='flex gap-2 mt-2'>
<input onChange={(e)=>setIsBestSeller(e.target.checked)} checked={isBestSeller} type="checkbox" id='bestseller'/>
<label htmlFor='bestseller'>Mark as Best Seller</label>
</div>

<button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
</form>
</div>
)
}

export default Add
