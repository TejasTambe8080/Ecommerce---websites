import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import Title from '../components/Title.jsx';
import AddressCard from '../components/AddressCard.jsx';
import AddressModal from '../components/AddressModal.jsx';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { token, backendURL, navigate, handleTokenError, setToken } = useContext(ShopContext);
  
  // Get token from localStorage directly (more reliable)
  const getAuthToken = () => {
    return token || localStorage.getItem('token');
  };
  
  // User profile state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    phone: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // Address modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Fetch user profile on mount
  useEffect(() => {
    const authToken = getAuthToken();
    if (authToken) {
      // Sync token to context if not already there
      if (!token && authToken) {
        setToken(authToken);
      }
      fetchProfile(authToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user profile
  const fetchProfile = async (authToken) => {
    if (!authToken) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendURL}/api/users/profile`,
        { headers: { token: authToken } }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setEditForm({
          name: response.data.user.name,
          phone: response.data.user.phone || ''
        });
        setImagePreview(response.data.user.profileImage || '');
      } else {
        if (response.data.message === 'Invalid token' || response.data.message === 'Not Authorized. Login again') {
          handleTokenError();
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (editForm.name.trim().length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }

    if (editForm.phone && !/^[0-9]{10}$/.test(editForm.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setSaving(true);
    
    try {
      const formData = new FormData();
      formData.append('name', editForm.name);
      formData.append('phone', editForm.phone);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await axios.put(
        `${backendURL}/api/users/profile`,
        formData,
        { 
          headers: { 
            token,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );

      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setUser(response.data.user);
        setIsEditing(false);
        setProfileImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Handle address operations
  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowAddressModal(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressModal(true);
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      const response = await axios.delete(
        `${backendURL}/api/users/address/${addressId}`,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Address deleted successfully');
        setUser(prev => ({
          ...prev,
          addresses: response.data.addresses,
          defaultAddressId: response.data.defaultAddressId
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Failed to delete address');
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const response = await axios.put(
        `${backendURL}/api/users/address/default/${addressId}`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Default address updated');
        setUser(prev => ({
          ...prev,
          addresses: response.data.addresses,
          defaultAddressId: response.data.defaultAddressId
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error setting default address:', error);
      toast.error('Failed to set default address');
    }
  };

  const handleAddressSave = async (addressData) => {
    try {
      let response;
      
      if (editingAddress) {
        response = await axios.put(
          `${backendURL}/api/users/address/${editingAddress._id}`,
          addressData,
          { headers: { token } }
        );
      } else {
        response = await axios.post(
          `${backendURL}/api/users/address`,
          addressData,
          { headers: { token } }
        );
      }

      if (response.data.success) {
        toast.success(editingAddress ? 'Address updated!' : 'Address added!');
        setUser(prev => ({
          ...prev,
          addresses: response.data.addresses,
          defaultAddressId: response.data.defaultAddressId || prev.defaultAddressId
        }));
        setShowAddressModal(false);
        setEditingAddress(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Failed to save address');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  // Show login prompt if not logged in
  if (!getAuthToken()) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-700">Please Login</h2>
        <p className="text-gray-500">You need to login to view your profile</p>
        <Link 
          to="/login" 
          className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t pt-10 pb-16 min-h-[80vh]">
      {/* Page Title */}
      <div className="text-2xl mb-8">
        <Title text1="MY" text2="ACCOUNT" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Profile Info */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-6">
              {/* Profile Image */}
              <div className="relative mb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-4 border-orange-100">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white text-4xl font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {!isEditing ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">Member since {formatDate(user?.createdAt)}</p>
                </>
              ) : (
                <p className="text-sm text-orange-600">Editing Profile</p>
              )}
            </div>

            {/* Profile Details / Edit Form */}
            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="text-gray-800 font-medium">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-gray-800 font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Mobile Number</p>
                    <p className="text-gray-800 font-medium">{user?.phone || 'Not added'}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Email (Read-only)</label>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Mobile Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="10-digit mobile number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm({ name: user?.name, phone: user?.phone || '' });
                      setImagePreview(user?.profileImage || '');
                      setProfileImage(null);
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-all disabled:bg-gray-400 flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Section - Addresses */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            {/* Address Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Manage Addresses</h3>
              <button
                onClick={handleAddAddress}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Address
              </button>
            </div>

            {/* Address List */}
            {user?.addresses?.length > 0 ? (
              <div className="grid gap-4">
                {user.addresses.map((address) => (
                  <AddressCard
                    key={address._id}
                    address={address}
                    isDefault={address._id === user.defaultAddressId || address.isDefault}
                    onEdit={() => handleEditAddress(address)}
                    onDelete={() => handleDeleteAddress(address._id)}
                    onSetDefault={() => handleSetDefault(address._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-500 mb-4">No addresses saved yet</p>
                <button
                  onClick={handleAddAddress}
                  className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-all"
                >
                  Add Your First Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <AddressModal
          address={editingAddress}
          onClose={() => {
            setShowAddressModal(false);
            setEditingAddress(null);
          }}
          onSave={handleAddressSave}
        />
      )}
    </div>
  );
};

export default Profile;
