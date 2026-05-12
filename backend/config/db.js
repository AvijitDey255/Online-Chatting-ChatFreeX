import mongoose from 'mongoose'
const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db Connect successfully")

    } catch (error) {
        console.log("db error")
    }
}
export default connectDB