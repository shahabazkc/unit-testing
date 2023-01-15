import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_number: {
        type: Number,
        required: false,
        unique: true,
        default: null,
        index: true
    }
}, {
    timestamps: true,
    autoIndex: false
});

export default mongoose.model('users', userSchema);