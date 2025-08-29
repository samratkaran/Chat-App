import express from 'express'
import isLogin from '../middleware/isLogin.js'
import {getUserBySearch, currentChat} from "../routeControlers/userRouteControler.js"


const router = express.Router()

router.get('/search',isLogin,getUserBySearch)
router.get('/currentchat', isLogin, currentChat)

export default router