import express from 'express'
// import User from '../models/User.js';
const router = express.Router();
// import  bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import 'dotenv/config.js'
import UserController from '../controller/user.js';
// import fetchuser from '../middleware/fetchUser.js';

// Route 1: Create a User using POST "/api/auth/signup". No login required
router.post('/signup', (req,res) => {
    new UserController().signup(req.body).then(
        (success)=>{
          res.send(success)
        }
       ).catch(
        (err)=>{
         res.send(err)
        }
       )
   
})

// // Route 2: Login a User using POST '/api/auth/login'. No Login required
router.post('/login',  (req,res) => {
    new UserController().login(req.body).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
    
})

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