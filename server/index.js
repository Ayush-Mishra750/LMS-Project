import express from "express";
const app=express();


app.listen(process.env.PORT,()=>{
    console.log(`server listening at port ${process.env.PORT}`);
})