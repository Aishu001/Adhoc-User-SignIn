import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    dateOfBirth: { type: Date, required: false },
    phoneNumber: { type: String, required: true, unique: true }
    
});


const User = mongoose.model('User', userSchema);

export default User;
