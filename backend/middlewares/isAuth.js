

import jwt from "jsonwebtoken"

const isAuth = (req, res, next) => {

    try {

        const token = req.cookies.token
        console.log("is auth token ",token)

        if (!token) {

            return res.status(401).json({
                message: "token not found"
            })

        }

        const verifiedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.userId = verifiedToken.userId

        console.log("is auth req.userId ",req.userId)

        next()

    } catch (error) {

        console.log(error)

        return res.status(401).json({
            message: "unauthorized"
        })

    }

}

export default isAuth