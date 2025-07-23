import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from './routes/course.routes.js'
dotenv.config({});
connectDb()
const PORT=process.env.PORT||3000;
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.urlencoded({ extended: true }));


//apis
app.use("/api/v1/user",userRoute)
app.use("/api/v1/course",courseRoute)


app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`);
})