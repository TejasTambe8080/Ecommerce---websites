import jwt from 'jsonwebtoken';

const authUser = async(req,res,next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({success:false,message:"No token provided"});
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        // Safely set userId on body (body may be undefined on GET requests)
        if (req.body) {
            req.body.userId = token_decode.id;
        }
        req.userId = token_decode.id;
        next();
    } catch (error) {
        console.log("Error in user authentication", error);
        return res.json({success:false,message:"Invalid token"});
    }
}

export default authUser;