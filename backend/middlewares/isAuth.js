

import jwt from "jsonwebtoken"

const isAuth = (req, res, next) => {

    try {

        const token = req.cookies.token
        

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

        

        next()

    } catch (error) {

      

        return res.status(401).json({
            message: "unauthorized"
        })

    }

}

export default isAuth