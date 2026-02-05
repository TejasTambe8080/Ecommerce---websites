import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

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

export { loginUser, registerUser, adminLogin };
