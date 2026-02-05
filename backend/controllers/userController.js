import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';

// function to create JWT token 
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// Routes for user login 
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        // Normalize email to lowercase for consistent checking
        const normalizedEmail = email.toLowerCase().trim();
        
        const user = await userModel.findOne({ email: normalizedEmail });
        if(!user){
            return res.json({ success: false, message: "User does not exist. Please sign up first." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id);
            res.json({ success: true, token });
        }else{
            res.json({ success: false, message: "Invalid email or password" });
        }
    }catch(error){
        console.log("Error in user login", error);
        res.json({ success: false, message: "Error in user login. Please try again." });
    }
};

// Routes for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Normalize email to lowercase for consistent checking
        const normalizedEmail = email.toLowerCase().trim();

        // check user already exists or not 
        const exist = await userModel.findOne({ email: normalizedEmail });
        if (exist) {
            return res.json({ success: false, message: "User already exists with this email" });
        }

        // validating email & strong password 
        if (!validator.isEmail(normalizedEmail)) {
            return res.json({ success: false, message: "Please enter a valid email address" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user 
        const newUser = new userModel({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // create token
        const token = createToken(user._id);

        res.json({ success: true, message: "User registered successfully", token });

    } catch (error) {
        console.log("Error in user registration", error);
        // Check for duplicate key error (MongoDB error code 11000)
        if (error.code === 11000) {
            return res.json({ success: false, message: "User already exists with this email" });
        }
        res.json({ success: false, message: "Error in user registration. Please try again." });
    }
};

// route for admin login
const adminLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        
        console.log("Login attempt - Email:", email);
        console.log("Expected Email:", adminEmail);
        console.log("Password match:", password === adminPassword);
        
        if(email === adminEmail && password === adminPassword){
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid admin credentials" }); 
        }
    }
    catch(error){
        console.log("Error in admin login", error);
        res.json({ success: false, message: "Error in admin login" });
    }
};

// ======================
// GET USER PROFILE
// ======================
const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ 
            success: true, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                profileImage: user.profileImage || '',
                addresses: user.addresses || [],
                defaultAddressId: user.defaultAddressId,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.log("Error fetching user profile:", error);
        res.status(500).json({ success: false, message: "Error fetching profile" });
    }
};

// ======================
// UPDATE USER PROFILE
// ======================
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, phone } = req.body;

        // Validation
        if (name && name.trim().length < 2) {
            return res.json({ success: false, message: "Name must be at least 2 characters" });
        }

        if (phone && !/^[0-9]{10}$/.test(phone)) {
            return res.json({ success: false, message: "Please enter a valid 10-digit phone number" });
        }

        // Handle profile image upload
        let profileImageUrl = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'cartiva/profiles',
                resource_type: 'image'
            });
            profileImageUrl = result.secure_url;
        }

        // Build update object
        const updateData = {};
        if (name) updateData.name = name.trim();
        if (phone) updateData.phone = phone;
        if (profileImageUrl) updateData.profileImage = profileImageUrl;

        const user = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-password');

        res.json({ 
            success: true, 
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                profileImage: user.profileImage || '',
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.log("Error updating user profile:", error);
        res.status(500).json({ success: false, message: "Error updating profile" });
    }
};

// ======================
// ADD NEW ADDRESS
// ======================
const addAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { fullName, phone, pincode, house, area, city, state, landmark, addressType, isDefault } = req.body;

        // Validation
        if (!fullName || !phone || !pincode || !house || !area || !city || !state) {
            return res.json({ success: false, message: "Please fill all required fields" });
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.json({ success: false, message: "Please enter a valid 10-digit phone number" });
        }

        if (!/^[0-9]{6}$/.test(pincode)) {
            return res.json({ success: false, message: "Please enter a valid 6-digit pincode" });
        }

        const user = await userModel.findById(userId);
        
        // Create new address object
        const newAddress = {
            fullName: fullName.trim(),
            phone,
            pincode,
            house: house.trim(),
            area: area.trim(),
            city: city.trim(),
            state: state.trim(),
            landmark: landmark?.trim() || '',
            addressType: addressType || 'Home',
            isDefault: isDefault || user.addresses.length === 0 // First address is default
        };

        // If this is set as default, remove default from others
        if (newAddress.isDefault) {
            user.addresses.forEach(addr => {
                addr.isDefault = false;
            });
        }

        user.addresses.push(newAddress);
        
        // Update defaultAddressId if this is default
        if (newAddress.isDefault) {
            user.defaultAddressId = user.addresses[user.addresses.length - 1]._id;
        }

        await user.save();

        res.json({ 
            success: true, 
            message: "Address added successfully",
            addresses: user.addresses,
            defaultAddressId: user.defaultAddressId
        });
    } catch (error) {
        console.log("Error adding address:", error);
        res.status(500).json({ success: false, message: "Error adding address" });
    }
};

// ======================
// UPDATE ADDRESS
// ======================
const updateAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addressId = req.params.id;
        const { fullName, phone, pincode, house, area, city, state, landmark, addressType } = req.body;

        // Validation
        if (!fullName || !phone || !pincode || !house || !area || !city || !state) {
            return res.json({ success: false, message: "Please fill all required fields" });
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.json({ success: false, message: "Please enter a valid 10-digit phone number" });
        }

        if (!/^[0-9]{6}$/.test(pincode)) {
            return res.json({ success: false, message: "Please enter a valid 6-digit pincode" });
        }

        const user = await userModel.findById(userId);
        const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);

        if (addressIndex === -1) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        // Update address fields
        user.addresses[addressIndex].fullName = fullName.trim();
        user.addresses[addressIndex].phone = phone;
        user.addresses[addressIndex].pincode = pincode;
        user.addresses[addressIndex].house = house.trim();
        user.addresses[addressIndex].area = area.trim();
        user.addresses[addressIndex].city = city.trim();
        user.addresses[addressIndex].state = state.trim();
        user.addresses[addressIndex].landmark = landmark?.trim() || '';
        user.addresses[addressIndex].addressType = addressType || 'Home';

        await user.save();

        res.json({ 
            success: true, 
            message: "Address updated successfully",
            addresses: user.addresses
        });
    } catch (error) {
        console.log("Error updating address:", error);
        res.status(500).json({ success: false, message: "Error updating address" });
    }
};

// ======================
// DELETE ADDRESS
// ======================
const deleteAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addressId = req.params.id;

        const user = await userModel.findById(userId);
        const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);

        if (addressIndex === -1) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        const wasDefault = user.addresses[addressIndex].isDefault;
        user.addresses.splice(addressIndex, 1);

        // If deleted address was default, set first address as default
        if (wasDefault && user.addresses.length > 0) {
            user.addresses[0].isDefault = true;
            user.defaultAddressId = user.addresses[0]._id;
        } else if (user.addresses.length === 0) {
            user.defaultAddressId = null;
        }

        await user.save();

        res.json({ 
            success: true, 
            message: "Address deleted successfully",
            addresses: user.addresses,
            defaultAddressId: user.defaultAddressId
        });
    } catch (error) {
        console.log("Error deleting address:", error);
        res.status(500).json({ success: false, message: "Error deleting address" });
    }
};

// ======================
// SET DEFAULT ADDRESS
// ======================
const setDefaultAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addressId = req.params.id;

        const user = await userModel.findById(userId);
        const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);

        if (addressIndex === -1) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        // Remove default from all addresses
        user.addresses.forEach(addr => {
            addr.isDefault = false;
        });

        // Set new default
        user.addresses[addressIndex].isDefault = true;
        user.defaultAddressId = user.addresses[addressIndex]._id;

        await user.save();

        res.json({ 
            success: true, 
            message: "Default address updated",
            addresses: user.addresses,
            defaultAddressId: user.defaultAddressId
        });
    } catch (error) {
        console.log("Error setting default address:", error);
        res.status(500).json({ success: false, message: "Error setting default address" });
    }
};

export { 
    loginUser, 
    registerUser, 
    adminLogin,
    getUserProfile,
    updateUserProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
};
    }
};

export { loginUser, registerUser, adminLogin };
