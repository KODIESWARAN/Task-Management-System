const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/usermodels')


exports.signup = async(req,res) => {
    const {username , password,email} = req.body;
    try {
       const hasedpassword = await bcrypt.hash(password ,12)
       const newUser  = await User.create({username , email ,password : hasedpassword})
       res.status(201).json(newUser)
    } catch (err) {
       res.status(404).json({message : "Error occured in Creating user" , err})
    }
}


exports.login = async(req,res) =>{
    const {email , password} = req.body;
    try {
        const user = await User.findOne({where : {email}})
        if(!user) return res.status(404).json({message : "No user found"})
        
        const match = await bcrypt.compare(password , user.password)
        if(!match) return res.status(404).json({message : "invalid credentials"})
        
        const token = jwt.sign({id : user.id} , process.env.JWT_SECRET)
        res.json({token})
        
    } catch (error) {
        res.status(404).json({message : "login error" , error})
    }
}


exports.logout = async (req, res) => {
    try {
      // No token invalidation server-side in basic JWT setup
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Logout failed", error });
    }
  };
  

