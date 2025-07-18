import jwt from "jsonwebtoken";

export const generateToken=async(req,user,message)=>{
    const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});

    return req.status(200).cookie("token",token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:24*60*60*1000  //1day
    }).json({
        success:true,
        message,
        user
    })
    
} 