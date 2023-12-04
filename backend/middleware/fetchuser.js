const jwt = require('jsonwebtoken');
const JWT_SECRET = "@UDAYshankar01122023";


const fetchuser = (req,res,next) =>{
    //get the user from the jwt token and it to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please Authenticate Using Valid token"});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please Authenticate Using Valid token"});
    }
}

module.exports = fetchuser;