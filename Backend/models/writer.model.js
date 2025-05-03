import mongoose from 'mongoose';

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
        maxlength: 500
    }
}, {
    timestamps: true
});

const Writer = mongoose.model('Writer', WriterSchema);
export default Writer;