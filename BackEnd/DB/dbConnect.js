import mongoose from "mongoose";

const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT)
        console.log('database connect succesfully')
    } catch (error) {
        console.log('error while connect to database', error)
        
    }
}

export default dbConnect