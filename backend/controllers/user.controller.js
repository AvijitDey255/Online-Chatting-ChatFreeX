import uploadCloudinary from "../config/cloudinary.js"
import User from "../modules/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {

        const userId = req.userId
        console.log("userId",userId)
        const user = await User.findById(userId).select("-password")
        console.log("user",user)
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            })
        }

        return res.status(200).json(user)


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "current user error"
        })
    }
}


export const editProfile = async (req, res) => {
    try {
        const { name } = req.body
        let image = undefined
        console.log("editProfile req.file: ",req.file)
        if (req.file) {
            image = await uploadCloudinary(req.file.path)
        }
        console.log("editProfile image: ",image)
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