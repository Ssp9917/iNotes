import express from 'express'
import User from '../models/User.js';
const router = express.Router();
import  bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js'
// import fetchuser from '../middleware/fetchUser.js';

// Route 1: Create a User using POST "/api/auth/signup". No login required
// router.post('/signup', async (req,res) => {

//     // data coming from body(frontend)
//     const {name,email,password} = req.body

//     try {
        
//         // Validation

//         if(!name || !email || !password){
//             return res.status(400).json({error:"All field are required"})
//         }

//         // Email Validation
//         if(!email.includes('@')){
//             return res.status(400).json({error:"Please enter a valid email"})
//         }

//         // Find Unique User Validation
//         const user = await User.findOne({email})
 
//         if(user){
//             res.status(400).json({error:"User already exists"})
//         }

//         //* Generate Salt 

//         const salt = await bcrypt.genSalt(10);


//         // * Hash password 
//         const hashedPassword = await bcrypt.hash(password,salt)

//         // Save Data into database
//         const newUser = await User({
//             name,
//             email,
//             password:hashedPassword
//         });


//         await newUser.save();
//         console.log(newUser)
//         res.status(200).json({success:"Signup successfully"})

//     } catch (error) {
//         console.log(error)
        
//         res.status(500).json({error:"Internal Server Error"})

//     }
// })

// // Route 2: Login a User using POST '/api/auth/login'. No Login required
// router.post('/login', async (req,res) => {
//     // * data coming from body(frontend)

//     const {email, password} = req.body

//     try {
        
//         // Validation
//         if(!email || !password) {
//             return res.status(400).json({error:"All fealds required"})
//         }

//         // Email Validation
//         if(!email.includes('@')){
//           return  res.status(400).json({error:"Please Enter a valid email"})
//         }

//         // find unique user with email
//         const user = await User.findOne({email})

//         // if user not exists with that email
//         if(!user){
//            return res.status(400).json({error:"User Not Found"})
//         }


//         // matching user password to hash password with bcrypt.compare()

//         const doMatch = await bcrypt.compare(password, user.password)

//         // if match password then generate token
//         if(doMatch){
//             const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET)


//             res.status(200).json({token,success:"Login successful"})
//         }else{
//             res.status(404).json({error:"Email and Password not found"} )
//         }
        


//     } catch (error) {
//         console.log(error)
//         res.status(400).json({error:"Inernal Server Error"})
//     }
// })

// // Route 3: get a user using POST "/api/auth/getuser". Login required

// router.get('/getuser',fetchuser, async (req,res)=>{
//     try {
        
//         const userId =  req.userId 
//         console.log('getuser Id', userId)

//         const user = await User.findById(userId).select('-password')
//         res.send(user);

//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//     }
// })

export default router 