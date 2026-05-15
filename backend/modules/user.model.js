import mongoose from "mongoose";

const userSchama = new mongoose.Schema({
    name:{
        type:String, 
    },
    userName:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        default:""
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    varifiedOTP:{
        type:String
    },
    OTPExpited:Date,
},{timeStamps:true})


const User = mongoose.model("User",userSchama)

export default User