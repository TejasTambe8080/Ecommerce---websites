import jwt from 'jsonwebtoken';

// Middleware to verify admin authentication
const adminAuth = async(req, res, next) => {
    try{
        const { token } = req.headers;
        if(!token){
            return res.json({success:false, message:"No token provided"});
        }
        
        // jwt.verify returns the decoded payload
        // For admin token, the payload is the email+password string
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const expectedPayload = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
        
        // decoded could be a string or object depending on how jwt.sign was called
        // Since jwt.sign(email+password, secret) was used, decoded will be the string
        if(decoded !== expectedPayload){
            return res.json({success:false, message:"Invalid admin token"});
        }
        
        next();
       
    } catch(error){
        console.log("Error in admin authentication:", error.message);
        res.json({success:false, message:"Authentication failed. Please login again."});
    }
}

export default adminAuth;