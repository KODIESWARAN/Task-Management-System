
const jwt = require('jsonwebtoken')


const authenticationJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "Token required" });

    const tokenParts = token.split(' ');

    try {
        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);  // Add logging to check token decoding
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};



module.exports = authenticationJWT