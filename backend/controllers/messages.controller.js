import uploadCloudinary from "../config/cloudinary.js"
import Conversation from "../modules/conversation.model.js"
import Message from "../modules/message.model.js"

export const sendMessage = async(req,res)=>{
    try {

        const sender = req.userId
        const {receiver} = req.params
        const {message} = req.body
        let image = undefined
        if (req.file) {
            image = await uploadCloudinary(req.file.path)
        }

        let conversation = await Conversation.findOne({
            partcipants:{$all:[sender,receiver]}
        })

        const newMessage = await Message.create({
            sender,
            receiver,
            message,
            image
        }) 

        if(!conversation){
            conversation = await Conversation.create({
                partcipants:[sender,receiver],
                messages:[newMessage._id]
            })
        }else{
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }

        return res.status(201).json(newMessage)


    } catch (error) {
        return res.status(500).json({
            message:"send message error"
        })
    }
}

export const getMessage = async(req,res)=>{
    try {
        const sender = req.userId
        const {receiver} = req.params
         let conversation = await Conversation.findOne({
            partcipants:{$all:[sender,receiver]}
        }).populate("messages")

        if(!conversation){
            return res.status(400).json({
            message:"conversation not found"
        })
        }

         return res.status(201).json(conversation?.messages)

    } catch (error) {
        return res.status(500).json({
            message:"get message error"
        })
    }
}