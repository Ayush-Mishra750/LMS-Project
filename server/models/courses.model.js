import mongoose, { mongo } from "mongoose";


export const coursesSchema= new mongoose.Schema({
    courseTitle:{
        type:String,
        required:true
    },
    subTitle:{
       type:String
    },
    category:{
        type:String,
        required:true
    },
    courseLevel:{
        type:String,
        enum:['beginner' ,'Medium' ,'advance']
    },
    coursePrice:{
        type:Number,
        required:true
    },
    courseThumbnail:[
        { type: String,
           ref:'User'
        }
    ],
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
     creator:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        isPublished:{
            type:Boolean,
            default:false
        }
    
},{timestamps:true});

export const Course=mongoose.model('Course',coursesSchema);