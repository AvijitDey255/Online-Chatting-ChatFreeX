import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    image:{
        type:String,
        default:""
    },
    message:{
        type:String,
        default:""
    }

},{timesStamps:true})

const Message = mongoose.model("Message",messageSchema)
export default Message