import {Router} from 'express'
import { emailVarified, login, logout, signup } from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/logout",logout)  
authRouter.post("/emailVarified",emailVarified)  

export default authRouter