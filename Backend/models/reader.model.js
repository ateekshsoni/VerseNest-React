// Import dependencies
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Reader schema for storing reader user data
const ReaderSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false // Do not return password by default
    },
    genreFocus: {
        type: String,
        enum: ['Lyrical', 'Narrative', 'Sonnet', 'Haiku', 'Fantasy', 'Free Verse', 'Other'],
        required: true
    },
    moodPreferences: {
        type: [String],
        enum: ['Reflective', 'Uplifting', 'Melancholic', 'Romantic'],
        default: undefined
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Generate JWT auth token for a reader
ReaderSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

// Compare input password with hashed password in DB
ReaderSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

// Hash a plain password before saving to DB
ReaderSchema.statics.hashPassword = async function (password) {
    if (!password) return null;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Create and export Reader model
const ReaderModel = mongoose.model('Reader', ReaderSchema);
export default ReaderModel;
