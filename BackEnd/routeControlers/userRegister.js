import User from "../Models/userModels.js"
import bcrypt from "bcryptjs";
import jwtToken from "../utils/jwtWebToken.js";


export const userRegister = async(req ,res)=>{
    try {
      const {fullname,username,email,gender,password,profilepic,dob} = req.body
      const user = await User.findOne({username,email});
      if(user) return res.status(500).send({success:false,message:"Username of Email Alreday Exist"})
        const hashPassword = bcrypt.hashSync(password,10)
    const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`
    const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
        fullname,
        username,
        email,
        gender,
        dob,
        password:hashPassword,
        profilepic:gender === "male" ? profileBoy : profileGirl
    })
    if(newUser){
        await newUser.save()
        jwtToken({ userId: newUser._id }, res)
    }else{
        res.status(500).send({success:false,message:"Invalid userdata"})
    }
    res.status(201).send({
        _id: newUser._id,
        fullName: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        dob: newUser.dob,
        profilepic: newUser.profilepic

    })
      
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error
        })
        console.log("error while creating User in userregister.js file", error)
    }
}

// export const userLogin = async(req, res)=>{
//     try {
//         console.log("Login body:", req.body); 
//         const {email, password} = req.body
//         const user  = await User.findOne({email})
//         if(!user) return res.status(500).send({success:false,message:"Email Doesn't exist"})
//         const comparePassword = bcrypt.compareSync(password, user.password || '');
//     if(!comparePassword) return res.status(500).send({success:false,message:"Email and Password Doesn't Match"})
//         jwtToken({ userId: user._id }, res)
//      res.status(200).send({
//         _id: user._id,
//         fullName: user.fullname,
//         username: user.username,
//         email: user.email,
//         profilepic: user.profilepic,
//         message: "succesfully Login"

//     })

        
//     } catch (error) {
//          res.status(500).send({
//             success:false,
//             message:error
//         })
//         console.log("error while User Login in userregister.js file", error)
//     }

// }
export const userLogin = async (req, res) => {
  try {
    console.log("Login body:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const isMatch = bcrypt.compareSync(password, user.password || "");

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error while User Login:", error.message);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const userLogout = async (req, res)=>{
    try {
        res.cookie("jwt",'',{
            maxAge:0
        }) 
        res.status(200).send({message:"User Logout"})
        
    } catch (error) {
         res.status(500).send({
            success:false,
            message:error
        })
        console.log("error while User logout in userregister.js file", error)
    }
}

export const resetPassword = async(req, res)=>{
  console.log('hello');
}