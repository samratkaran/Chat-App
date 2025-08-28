import jwt from 'jsonwebtoken'
import User from '../Models/userModels.js'



const isLogin = async(req, res, next)=>{
    try {
        // console.log(`${req.cookies.jwt} from isLogin middleware`);
        const token = req.cookies.jwt
    if(!token) return res.status(500).send({success: false, message:"user Unauthrized"})
        const decode = jwt.verify(token, process.env.JWT_SECRET)  
    //  console.log("Decoded JWT:", decode); 
    if(!decode) return res.status(500).send({success: false, message:"user Unauthrized - Invalid Token"}) 
        const user = await User.findById(decode.userId).select("-password");
    // console.log("user found in isLogin middleware:", user);
    if(!user)      return res.status(500).send({success: false, message:"User Not Found"}) 
        req.user = user,
    // console.log(`we have req.user in isLogin middleware ${req.user}`);
    next()
    } catch (error) {
         console.log(`error in isLogin Middleware ${error.message}`)
         res.status(500).send({
            success:false,
            message:error
        })
       
    }
}

export default isLogin