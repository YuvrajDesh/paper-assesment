const express = require('express');
const app = express()
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'isagoodb$oy';

var fetchuser = require('../middleware/fetchuser');
// Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password must be atleast 3 characters').isLength({ min: 3 }),
 ], async (req, res) => {
   // If there are errors, return Bad request and the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   // Check whether the user with this email exists already
   try {
     let user = await User.findOne({ email: req.body.email });
     if (user) {
       return res.status(400).json({ error: "Sorry a user with this email already exists" })
     }
     const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(req.body.password, salt);
      // Create a new user
    user = await User.create({
      name: req.body.name,
      password: hash,
      email: req.body.email,
      userType : req.body.userType
    })
    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    
    res.json(authtoken)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
})

// Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [ 
    body('email', 'Enter a valid email').isEmail(), 
    body('password', 'Password cannot be blank').exists(), 
  ], async (req, res) => {
  
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }
  
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      const status = "ok";
      res.json({authtoken,status})
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  })

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required

 router.post('/getuser',
  async (req, res) => {
try{
const userId = req.user; 
console.log(userId);

const user = await User.findById(userId).select("-password")
 res.send(user)

}catch(error){

 res.status(500).send("Internal Server Error")
}

})
// Endpoint to fetch all  users based on gmail
router.get('/getusers', async (req, res) => {
  try {
    const users = await User.find({}, 'email'); // Assuming your User model has a 'email' field
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


 
module.exports = router

