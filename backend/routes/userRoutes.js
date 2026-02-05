import express from 'express';
import { 
    loginUser, 
    registerUser, 
    adminLogin,
    getUserProfile,
    updateUserProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} from '../controllers/userController.js';
import authUser from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

// Auth routes
userRouter.post('/register', registerUser); 
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

// Profile routes (protected)
userRouter.get('/profile', authUser, getUserProfile);
userRouter.put('/profile', authUser, upload.single('profileImage'), updateUserProfile);

// Address routes (protected)
userRouter.post('/address', authUser, addAddress);
userRouter.put('/address/:id', authUser, updateAddress);
userRouter.delete('/address/:id', authUser, deleteAddress);
userRouter.put('/address/default/:id', authUser, setDefaultAddress);

export default userRouter;