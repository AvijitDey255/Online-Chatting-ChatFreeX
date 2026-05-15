import { Router } from 'express'
import { editProfile, getConversationUsers, getCurrentUser, getOtherUsers, searchUser } from '../controllers/user.controller.js'
import isAuth from '../middlewares/isAuth.js'
import { upload } from '../middlewares/multer.js'
const userRouter = Router()

userRouter.get("/current", isAuth, getCurrentUser)
userRouter.put("/profile", isAuth, upload.single("image"), editProfile)
userRouter.get("/others", isAuth, getOtherUsers)
userRouter.get("/conversation-users",isAuth,getConversationUsers)
userRouter.get("/search/:keyword",isAuth,searchUser)
export default userRouter

