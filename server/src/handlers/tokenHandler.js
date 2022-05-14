const  jsonwebtoken  = require("jsonwebtoken");
const { Admin, User } = require('../models');

const tokenDecode = (req) => { // functio to decode the token
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')[1];
        try {
            const tokenDecoded = jsonwebtoken.verify(
                bearer,
                process.env.TOKEN_SECRET_KEY
            );
            return tokenDecoded;
        } catch(err) {
            return false;
        }

    } else {
        return false;
    }
} // end function

exports.verifyAdminToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req );
    if(tokenDecoded) {
        const admin = await Admin.findById(tokenDecoded.id);
        if (!admin) return res.status(403).json('Token expired Login Again!');
        req.admin = admin;
        next();
    } else {
        res.status(401).json('Unauthorized');
    }
} // end function


exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req );
    if(tokenDecoded) {
        const admin = await Admin.findById(tokenDecoded.id);
        const user = await User.findById(tokenDecoded.id);
        if (!admin && !user ) return res.status(403).json('Wrong Token, login Again!');
        req.admin = admin;
        req.user = user;
        next();
    } else {
        res.status(401).json('Unauthorized');
    }

} //end function 