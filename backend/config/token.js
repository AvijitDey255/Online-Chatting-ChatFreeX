import jwt from 'jsonwebtoken'


const getToken = async (userId) => {
    try {
        const token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

        return token

        console.log("token is ",token)
    } catch (error) {
        console.log("getToken error")
    }
}

export default getToken