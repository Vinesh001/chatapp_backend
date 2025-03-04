// yeah normal hota hai nodejs me
// const express = require('express')

// react ki tarah import karna hai toh
import express from 'express'  // but iske liye ek change karna hai package json me jake type:module karna hai
import dotenv from 'dotenv'
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { app,server } from "./socket/socket.js";
dotenv.config({});

connectDB();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"https://chatapp-fm3v.onrender.com",
    credentials:true
}));
// app.use(cors())

// app.get('/', (req, res)=>{ 
//     res.send("Hi there!");
// })

app.use("/api/v1/user", userRoute );
app.use("/api/v1/message", messageRoute);


const PORT = process.env.PORT||8080;
server.listen(PORT, "0.0.0.0", ()=>{
    console.log(`Server is listening on port ${PORT}`);
})