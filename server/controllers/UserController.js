import { comparePassword, hashPassword } from "../helpers/UserHelper.js"
import UserModel from "../models/UserModel.js"
import JWT from 'jsonwebtoken';

export const registerController =async(req,resp)=>{
   try {
   const{name,email,password,phone,address} =  req.body
   if(!name){
    resp.send({error:"Name is required"})
   }
   if(!email){
    resp.send({error:"Email is required"})
   }
   if(!password){
    resp.send({error:"Password is required"})
   }
   if(!phone){
    resp.send({error:"Phone is required"})
   }
   if(!address){
    resp.send({error:"Address is required"})
   }
   
//   Check user

   const existingUser = await UserModel.findOne({email})

//  Existing User

   const hashedPassword = await hashPassword(password)

//    Save

   const user = await new UserModel({name,email,phone,address,password:hashedPassword}).save()

   resp.status(201).send({
    success:true,
    message:"User Registered Successfully",
    user,
   })

   if(existingUser){
    return resp.status(200).send({
        success:true,
        message:'Already Registered please login',
    })
   }
   } catch (error) {
    console.log(error)
    resp.status(500).send({
        success:false,
        message: "Error in Registration",
        error
    })
   }
}

// LOGIN || POST

export const loginController =async(req,resp)=>{
  try {
    const {email,password} = req.body

   //  Validation

   if(!email,!password){
      return resp.status(404).send({
         success:false,
         message: 'Invalid Email or Password',

      })
   }
   // Decrupt the Password

   // Check user

   const user = await UserModel.findOne({email})

   if(!user){
      return resp.status(404).send({
         success:false,
         message:'Email is not Registerd'
      })
   }

   const match = await comparePassword(password,user.password)
     if(!match){
      return resp.status(200).send({
         success:false,
         message: 'Invalid Password'
      })
     }
     
   //   JWT Token

   const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET , {
      expiresIn: "7d"
   });

resp.status(200).send({
   success:true,
   message: 'Login SuccessFully',
   user:{
     name: user.name,
     email: user.email,
     phone: user.phone,
     address: user.address,
   },
   token,
})

  } catch (error) {
   console.log(error)
   resp.status(500).send({
      success:false,
      message: 'Error in Login',
      error,
   })
  }
}

