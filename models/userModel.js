import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true,
    },
    LastName: {
        type: String,
        required: true,
        trim: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    Phone: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    Country: {
        type: String,
        enum: ["India", "USA", "Japan", "Other"]
    }
}, { timestamps: true })


export default mongoose.model("User", userSchema);