import React from 'react';

const AddressCard = ({ address, isDefault, onEdit, onDelete, onSetDefault }) => {
  return (
    <div className={`border rounded-lg p-4 ${isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Address Type Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              address.addressType === 'Home' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              {address.addressType}
            </span>
            {isDefault && (
              <span className="text-xs font-medium px-2 py-1 rounded bg-orange-100 text-orange-700">
                Default
              </span>
            )}
          </div>

          {/* Name & Phone */}
          <p className="font-semibold text-gray-800">{address.fullName}</p>
          <p className="text-sm text-gray-600 mt-1">{address.phone}</p>

          {/* Full Address */}
          <p className="text-sm text-gray-600 mt-2">
            {address.house}, {address.area}
            {address.landmark && `, ${address.landmark}`}
          </p>
          <p className="text-sm text-gray-600">
            {address.city}, {address.state} - {address.pincode}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-1 ml-4">
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-sm text-red-600 hover:text-red-800 hover:underline"
          >
            Delete
          </button>
          {!isDefault && (
            <button
              onClick={onSetDefault}
              className="text-sm text-orange-600 hover:text-orange-800 hover:underline whitespace-nowrap"
            >
              Set Default
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
