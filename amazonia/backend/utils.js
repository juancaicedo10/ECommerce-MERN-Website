const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const tokenData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    };
    return jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = generateToken