import {User} from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all field are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: true,
        message: "user already exist with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    })
    return res.status(201).json({
      success: true,
      message: "account created successfully",
    });
  } catch (error) {
    console.log("error occurred");
    return res.status(500).json({
      success: false,
      message: "failed to register",
    });
  }
};

export const login=async(req,res)=>{
try {
    const {email,password}=req.body;
 if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all field are required",
      });
    }
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({
            success:false,
            message:"incorrect email or password"
        })
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            success:false,
            message:"incorrect email or password"
        })
    }
    generateToken(res,user,`welcome back ${user.name}`);
} catch (error) {
    console.log("error occurred");
    return res.status(500).json({
      success: false,
      message: "failed to register",
    });
}
}
