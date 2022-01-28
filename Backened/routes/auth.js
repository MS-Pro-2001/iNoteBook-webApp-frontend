const express = require('express')
const router = express.Router();
const User = require('../models/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fecthUser")

const Jwt_Secret = "mridul@123"
// Route 1: Create a user using : POST at '/api/auth/createUser
router.post('/createUser',[

     body('firstname').isLength({min:5}),
     body('lastname').isLength({min:5}),
     body('email').isEmail(),
     body('password').isLength({min:6})

    
], async (req,res)=>{


  // If there are errors, return errors and Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    //Check Wether a user with this email already exit
    let user = await User.findOne({email:req.body.email})
    if(user){
      return res.status(400).json({error:'User with this email already exits'})
    }
    //   Create a New User
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password:secPass,
        email: req.body.email,
      
      })
      // .then(user => res.json(user))
      // .catch( err=>{console.log(err)
      //   res.json({error:"Please enter unique email address",message: err.message})} )
     
    


    // const user = User(req.body)
    // user.save();

   
    // res.send(req.body)
    // console.log(req.body)
    const data ={
      user:{
        id:user.id
      }
    }
    const authToken =  jwt.sign(data,Jwt_Secret);
    //  console.log(jwtData); 

     
    res.json({authToken})
})









// Route 2: authenticate a user using : POST at '/api/auth/loginUser

router.post('/loginUser',[


  body('email',"Enter a valid Email").isEmail(),
  body('password',"password cannot be empty").exists()

 
], async (req,res)=>{

   // If there are errors, return errors and Bad request
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const {email,password} = req.body

   try {
     let user = await User.findOne({email})
     if(!user){
       return res.status(400).json({error:"Please login through correct email"})
     }

     const passwordCompare = await bcrypt.compare(password,user.password)
     if(!passwordCompare){
      return res.status(400).json({error:"Please login through correct password credentials"})
    }

    const data ={
      user:{
        id:user.id
      }
    }
    const authToken =  jwt.sign(data,Jwt_Secret);
    res.json({authToken})
     
   } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal server error")
     
   }

  
})





// Route 3: Get a user details using : POST at '/api/auth/GetUserDetails

router.get('/GetUserDetails', fetchUser, async (req,res)=>{

  try {
      userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
    
  }




})

module.exports = router;