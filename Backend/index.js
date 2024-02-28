import express  from "express";
import connectToMongo from "./database/db.js";

import notes from './routes/notes.js'
import cors from 'cors'


const app = express()
const port = 5001
connectToMongo() 

// middleware
app.use(express.json())
app.use(cors({
 origin:['https://i-notes-frontend-ashen.vercel.app'],
 methods:["POST","GET","PUT","DELETE"],
 credentials: true
}))


// awailable routes  
// app.use('/api/auth',auth)
app.use('/api/notes',notes) 

 
app.get('/',(req,res)=>{ 
    res.send("Hello Sonu")
});

app.listen(port,()=>{
    console.log('***Server Started Successfull***')
});   
