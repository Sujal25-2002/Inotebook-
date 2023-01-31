const jwt = require('jsonwebtoken');
const JWT_SECRET='sujalisagoodb$oy'


const fetchuser = (req,res,next)=>{

    //get the user from jwt token and id to request obj

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:'please authenticate with valid token '})
    }

    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:'please authenticate with valid token '})
    }

}

module.exports = fetchuser;