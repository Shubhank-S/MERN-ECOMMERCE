import JWT from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

// Middleware for token

export const requireSignIn = async (req,resp,next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode;
        next();
    } catch (error) {
    console.log(error)
   
}
}

// Middleware for Admin
// Admin Access 

export const isAdmin = async(req,resp,next)=>{
 try {
    const user = await UserModel.findById(req.user._id)
    if(user.role ==! 1){
      return  resp.status(401).send({
            success:false,
            message:'Unauthorized User'
        })
    }
    else{
        next();
    }
 } catch (error) {
    console.log(error)
    resp.status(401).send({
        success:false,
        message:"Error in Admin middleware",
        error,
    })
 }
}