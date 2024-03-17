import express  from "express";
import connectToMongo from "./database/db.js";
import auth from './routes/auth.js'
import notes from './routes/notes.js'
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = process.env.port || 5001
connectToMongo() 

// middleware 
app.use(express.json())
app.use(cors())


// Serve static files from the React app
app.use(express.static(join(__dirname, './build')));


// awailable routes  
app.use('/api/auth',auth)
app.use('/api/notes',notes) 

 
app.get('/',(req,res)=>{ 
    res.send("Hello Sonu")
});

app.listen(port,()=>{
    console.log('***Server Started Successfull***')
});   
