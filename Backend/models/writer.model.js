import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Writer schema for storing writer user data
const WriterSchema = new mongoose.Schema({
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
        required: true
    },
    penName: {
        type: String,
        default: null,
        trim: true
    },
    genreFocus: {
        type: [String],
        enum: ['Lyrical', 'Narrative', 'Sonnet', 'Haiku', 'Fantasy', 'Free Verse', 'Other'],
        required: true
    },
    shortBio: {
        type: String,
        minlength: [10 , 'Bio must be at least 10 characters long'],
        maxlength: [500, 'Bio must be at most 500 characters long'],
    }
}, {
    timestamps: true
});

// Generate JWT auth token for a writer
WriterSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

// Compare input password with hashed password in DB
WriterSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

// Hash a plain password before saving to DB
WriterSchema.statics.hashPassword = async function (password) {
    if (!password) return null;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Writer model export
const WriterModel = mongoose.model('Writer', WriterSchema);
export default WriterModel;