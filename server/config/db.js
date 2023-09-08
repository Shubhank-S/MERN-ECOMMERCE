import mongoose from "mongoose"
import colors from "colors"

const connectDB =async()=>{
    try {
        
    const connection = await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected To MongoDB")
    } catch (error) {
        console.log(`Error ${error}`.bgRed.white)
    }
}

export default connectDB;