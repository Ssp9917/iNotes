import 'dotenv/config';
import jwt from 'jsonwebtoken' 

const fetchuser = (req,res,next) => {
    // Get the user from the jwt token and add id to req object

    const token = req.header('auth-token');

    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})

    }

    try {
      const {userId} = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = userId

        // if varified, then execute the next function
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
}

export default fetchuser