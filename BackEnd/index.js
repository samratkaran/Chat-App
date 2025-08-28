import express from 'express';
import dotenv from 'dotenv'
import dbConnect from './DB/dbConnect.js';
import authRouter from './route/authUser.js'
import messageRouter from "./route/messageRoute.js"
import cookieParser from 'cookie-parser';
import userRoute from "./route/userRoute.js"

const app = express()
dotenv.config()
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRoute)

app.get('/',(req,res)=>{
    res.send('server is working')
})
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    dbConnect()
    console.log(`working properly on ${PORT}`)
})