const express=require('express');
const router=express.Router();
const userCtrl=require("../controllers/userCtrl");
const auth = require('../middleware/auth');
// register user
router.post('/register',userCtrl.registerUser)

// login user
router.post('/login',userCtrl.loginUser)

// it check wether a token is verified 
router.get('/verify', userCtrl.verifiedToken);
module.exports=router; 