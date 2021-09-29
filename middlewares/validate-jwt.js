const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    // Read the Token
    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'You need a valid token'
        })
    }

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req._id = _id;
        next();
    } catch(ex) {
        res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }
}

module.exports = {
    validateJWT
}