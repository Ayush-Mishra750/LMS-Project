import { pathToFileURL } from "url";
import {User} from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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

export const logOut=async(_,res)=>{
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
      success:true,
      message:" logout successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"failed to logout"
    })
  }
}

export const getUserProfile=async(req,res)=>{
  try {
    const userId=req.id;
    const user=await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({
        success:false,
        message:"Profile not found"
      })
    }
    return res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"failed to load user"
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    let photoUrl = user.photoUrl;

    // Upload new photo if provided
    if (profilePhoto) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      const cloudResponse = await uploadMedia(profilePhoto.path);
      if (!cloudResponse?.secure_url) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload new photo to Cloudinary",
        });
      }

      photoUrl = cloudResponse.secure_url;
    }

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (photoUrl) updateData.photoUrl = photoUrl;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: " profile updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
