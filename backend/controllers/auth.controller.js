import getToken from "../config/token.js"
import { sendMail } from "../middlewares/sendMail.js"
import User from "../modules/user.model.js"
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
const isProduction = process.env.NODE_ENV === "production"
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

        const otp = crypto.randomInt(10000, 99999).toString();

        const OTPExpited = Date.now() + 10 * 60 * 1000;

        const userData = new User({
            userName: userName,
            email: email,
            password: hashPassword,
            varifiedOTP: otp,
            OTPExpited,
        });

        const user = await userData.save();

        const { password: pass,OTPExpited,isVerified,verifiedOTP, ...rest } = user._doc;
        const data = {
            email: user?.email,
            subject: "Varified email",
            message: `Please use the following OTP to verify you email: ${otp}`,
        };
        await sendMail(data);




        return res.status(200).json({
            user: rest,
            success: true,
            message: "User register successfull"
        })

    } catch (error) {
        return res.status(500).json({
            message: "error while signup user",

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

        if (!user.isVarified) {

            let otp;




            otp = crypto.randomInt(10000, 99999).toString();

            const OTPExpited =
                Date.now() + 10 * 60 * 1000;

            user.varifiedOTP = otp;
            user.OTPExpited = OTPExpited;

            await user.save();

            const data = {
                email: user.email,
                subject: "Verify your email",
                message: `Please use this OTP to verify your email: ${otp}`,
            };

            await sendMail(data);

            return res.status(400).json({
                success: false,
                message: "Email not verified. OTP sent.",
            });
        }

        const { password: pass, ...rest } = user._doc;

        const token = await getToken(user._id)


        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            user: rest,
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
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        })
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

export const emailVarified = async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (!otp) {
            return res.status(422).json({ message: "otp is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User Doesn't Exists" });
        }

        if (user.OTPExpited < Date.now()) {
            return res
                .status(400)
                .json({ success: false, message: "OTP is expired" });
        }
        if (user.varifiedOTP !== otp) {
            return res
                .status(400)
                .json({ success: false, message: "OTP is Invalid" });
        }

        user.varifiedOTP = undefined;
        user.OTPExpited = undefined;
        user.isVarified = true;
        await user.save();
        const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        const { password: pass, ...rest } = user._doc;

        // res.status(200).cookie("token", token).json({
        //     success: true,
        //     message: "OTP Verify successfully!",
        //     user: rest,
        // });

        res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: "OTP Verify successfully!",
            user: rest,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "OTP Verify error"
        });
    }


}