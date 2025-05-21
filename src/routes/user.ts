import { Router } from "express";
const userRouter=Router()

userRouter.post('/signup',(req,res)=>{
    res.json({
        message:'signup'
    })
})

export default userRouter