import express from "express";
import { userRegister, userLogin, userLogout, resetPassword} from "../routeControlers/userRegister.js";


const router = express.Router()

router.post('/register',userRegister)
router.post('/login',userLogin)
router.post('/reset',resetPassword)
router.post('/logout',userLogout)


export default router

