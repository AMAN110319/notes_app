const userSchema=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userCtrl = {
    registerUser: async (req,res)=>{
        try {
            const {username,email,password}=req.body;
            const user=await userSchema.findOne({email});
            if(user){
                return res.status(400).json({message:"user already exist"}); 
            }

            const passwordhash=await bcrypt.hash(password,10);

            // now or we can use userScehma.create({})

            const newUser=new userSchema({
                username:username,
                email:email,
                password:passwordhash
            })

            await newUser.save();

            res.json({msg:"Sign up successful"});
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }    
    },

    loginUser: async (req,res)=>{
        try {
            const {email,password}=req.body;
            const user=await userSchema.findOne({email});
            
            if(!user){
                res.status(400).json({msg:"user does not exist"});
            }

            const isMatch= await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(400).json({msg:"incorrect password"});

            // if login success create token
            const payload= {id:user._id,name:user.username};
            const token = jwt.sign(payload,"aman")
            res.json({token});
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
        
    },

    verifiedToken: async (req, res) => {
        try {
            const token = req.headers.authorization;
            // console.log("Token:", token); // Add this line for debugging
            if (!token) return res.send(false);
    
            // Verify token using a promise-based approach
            const verified = await jwt.verify(token, "aman");
    
            // Find user by ID
            const user = await userSchema.findById(verified.id);
            if (!user) {
                console.error("User not found with ID:", verified.id); // Add this line for debugging
                return res.send(false);
            }
    
            // If user found, return true
            return res.send(true);
        } catch (error) {
            console.error("Error:", error); // Add this line for debugging
            return res.status(500).json({ msg: error.message });
        }
    }
    

}

module.exports=userCtrl