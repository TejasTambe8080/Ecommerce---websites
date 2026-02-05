import mongoose from 'mongoose';

// Address sub-document schema
const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    house: { type: String, required: true }, // House / Flat / Building
    area: { type: String, required: true }, // Area / Street / Locality
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String, default: '' },
    addressType: { type: String, enum: ['Home', 'Work'], default: 'Home' },
    isDefault: { type: Boolean, default: false }
}, { timestamps: true });

// User schema with profile and addresses
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    cartData: { type: Object, default: {} },
    addresses: [addressSchema],
    defaultAddressId: { type: mongoose.Schema.Types.ObjectId, default: null }
}, { minimize: false, timestamps: true });


const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;