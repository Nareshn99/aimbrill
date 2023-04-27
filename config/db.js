import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB is connected ${conn.connection.host}`)
    }
    catch (err) {
        console.log(err.message)
    }
}

export default connectDB;