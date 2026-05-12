import getToken from "../config/token.js"
import User from "../modules/user.model.js"
import bcrypt from 'bcryptjs'
export const signup = async (req, res) => {
    try {

        const { userName, email, password } = req.body

        if (!userName) {
            return res.status(400).json({
                message: "User name is required"
            })
        }
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            })
        }

        const checkUserByUserName = await User.findOne({ userName })

        if (checkUserByUserName) {
            return res.status(400).json({
                message: "UserName already exist"
            })
        }

        const checkUserByEmail = await User.findOne({ email })

        if (checkUserByEmail) {
            return res.status(400).json({
                message: "Email already exist"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be 6 char"
            })
        }


        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            userName, email, password: hashPassword
        })


        const token = await getToken(user._id)

     
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


        return res.status(200).json({
            user,
            success: true,
            message: "User register successfull"
        })

    } catch (error) {
        return res.status(500).json({
            message: "error while signup user",
            error
        })
    }



}


export const login = async (req, res) => {
    try {

        const { email, password } = req.body


        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            })
        }



        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "invalid auth"
            })
        }

        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (!isMatchPassword) {
            return res.status(400).json({
                message: "invalid auth"
            })
        }




        const token = await getToken(user._id)

       
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            user,
            success: true,
            message: "User login successfull"
        })

    } catch (error) {
        return res.status(500).json({
            message: "error while login user",
            "error": error
        })
    }



}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({

            success: true,
            message: "User logout successfull"
        })
    } catch (error) {
        return res.status(500).json({

            message: "Error while logout"
        })
    }
}