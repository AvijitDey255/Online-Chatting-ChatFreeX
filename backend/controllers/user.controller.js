import uploadCloudinary from "../config/cloudinary.js"
import User from "../modules/user.model.js"
import Conversation from "../modules/conversation.model.js"

export const getCurrentUser = async (req, res) => {
    try {

        const userId = req.userId
       
        const user = await User.findById(userId).select("-password")
      
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            })
        }

        return res.status(200).json(user)


    } catch (error) {
        
        return res.status(500).json({
            message: "current user error"
        })
    }
}


export const editProfile = async (req, res) => {
    try {
        const { name } = req.body
        let image = undefined
       
        if (req.file) {
            image = await uploadCloudinary(req.file.path)
        }
      
        const updatedData = {
            name
        }

        if (image) {
            updatedData.image = image
        }
        const user = await User.findByIdAndUpdate(req.userId,
            updatedData,
            { new: true }
        ).select("-password")
        if (!user) {
            return res.status(400).json({
                message: "user not found",

            })
        }


        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            message: "profile error"
        })
    }
}



export const getOtherUsers = async(req,res)=>{
    try {
        
        const users = await User.find({
            _id:{$ne:req.userId}
        }).select("-password")
        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({
            message: "getotherusers error"
        })
    }
}




export const getConversationUsers = async (req, res) => {

    try {

        const myId = req.userId

        const conversations = await Conversation.find({
            partcipants: myId
        }).populate("partcipants", "-password")

        let users = []

        conversations.forEach((conv) => {

            const otherUser = conv.partcipants.find(
                (user) => user._id.toString() !== myId.toString()
            )

            if (otherUser) {
                users.push(otherUser)
            }

        })

        return res.status(200).json(users)

    } catch (error) {

       
        return res.status(500).json({
            message: "Conversation users error"
        })

    }

}




export const searchUser = async (req, res) => {

    try {

        const { keyword } = req.params

        const myId = req.userId

        if (!keyword) {

            return res.status(400).json({
                message: "Keyword is required"
            })

        }

        const users = await User.find({

            userName: {
                $regex: keyword,
                $options: "i"
            },

            _id: {
                $ne: myId
            }

        }).select("-password")

        return res.status(200).json(users)

    } catch (error) {

       

        return res.status(500).json({
            message: "Search user error"
        })

    }

}