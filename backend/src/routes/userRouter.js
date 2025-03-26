import express from 'express'
import User from '../models/user.js';
import { createUser,getUser } from '../controller/userController.js';
import { validateUser } from '../middlewares/expressValidator.js';
const userRouter = express.Router()
import { upload } from '../config/multer.js';

userRouter.post('/',upload.array("documents",2),validateUser,async (req,res)=>{
    return await createUser(req,res)
})
userRouter.get('/',async (req,res)=>{
    return await getUser(req,res)
})
export {userRouter}