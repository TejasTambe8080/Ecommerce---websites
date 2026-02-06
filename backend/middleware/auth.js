import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "No token provided. Please login." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure req.body exists (it's undefined on GET requests without JSON body)
        if (!req.body) req.body = {};

        // Set userId on both req.body (for cart/order controllers) and req (for user controller)
        req.body.userId = token_decode.id;
        req.userId = token_decode.id;
        next();
    } catch (error) {
        console.log("Auth middleware - JWT error:", error.message);
        if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, message: "Token expired. Please login again." });
        }
        return res.json({ success: false, message: "Invalid token. Please login again." });
    }
}

export default authUser;