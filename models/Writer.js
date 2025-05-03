const mongoose = require('mongoose');

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
        enum: ['Fiction', 'Non-Fiction', 'Poetry', 'Drama', 'Fantasy', 'Science Fiction', 'Romance', 'Mystery', 'Horror', 'Other'],
        required: true
    },
    shortBio: {
        type: String,
        maxlength: 500
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Writer', WriterSchema);
