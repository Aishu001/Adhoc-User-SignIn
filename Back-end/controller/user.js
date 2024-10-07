import jwt from 'jsonwebtoken';
import { checkIfEmailExist, generateToken } from '../middlerware/user.js';
import User from '../models/user.js';



export const login = async (req,res) => {
    try {
        // Check if a user with the same email exists
        const checkUserExist = await checkIfEmailExist(req);
        if (checkUserExist) {
            return res.status(409).send('Email already exists');
        }
// const hashedPassword = await bcrypt.hash(req.body.password, 10);
const newUser = new User({
    ...req.body,
});

// Save the user to the database
await newUser.save();
const user = {
    fullName: newUser.fullName,
    email: newUser.email,
    phoneNumber: newUser.phoneNumber
};

        // Generate a token
        const token = generateToken(newUser._id);
        res.status(201).json({
            message: 'User registered successfully',
            token: token,
            user: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in code');
    }
}


// Function to get all users
export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({}); // Fetch all documents from the 'User' collection

        // Return the list of users
        res.status(200).json({
            message: 'All users fetched successfully',
            users: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
};
