const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET='sujalisagoodb$oy'

//RUOTE :1 create a user using :post /api/auth/createuser
router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
    
],async (req,res)=>{
  //thorwing error if there are no user and a bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check wheather the user with the same email exixst or not 

    try {
      
   
   let user =  await User.findOne({email:req.body.email});
   if (user){
    return res.status(400).json({error:'Sorry the User with the same email is already exist '})
   }

   const salt = await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password,salt);
   //create a new user 
     user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      })
      const data = {
        user:{
          id: user.id
        }
      }

      const authToken = jwt.sign(data,JWT_SECRET);
     
      
      // res.json(user)
      res.json({authToken})

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Some error occured');
    }
})




//ROUTE :2 Authenticate  a user using :post /api/auth/login
router.post('/login',[
  body('email','email cannot be blank').isEmail(),
  body('password','password cannot be blank').exists(),
  
],async (req,res)=>{

//thorwing error if there are no user and a bad request 
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

const {email,password} = req.body;
try {
  let user =await User.findOne({email});
  if(!user){
    return res.status(400).json({error:"Please try to login with correct credentials "});
  }

  //this will check or compare the password with the user password for hasing or salting 
  const passwordCompare = await bcrypt.compare(password,user.password)
  if(!passwordCompare){
    return res.status(400).json({error:"Please try to login with correct credentials "});
  }

  const data = {
    user:{
      id: user.id
    }
  }

  const authToken = jwt.sign(data,JWT_SECRET);
  res.json({authToken})

} catch (error) {
  console.error(error.message);
  res.status(500).send('Internal server error');
}
})
  


//ROUTE :3 get a loggedin user details :post /api/auth/getuser  login requires

router.post('/getuser',fetchuser,async (req,res)=>{
  try {
    userId = req.user.id;
    const user =await User.findById(userId).select("-password")
    res.send(user)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }

})

module.exports = router