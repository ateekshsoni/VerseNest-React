// Import the Reader model
import ReaderModel from '../models/reader.model.js';

// Service function to create a new Reader instance
export async function createReader({ fullName, email, password, genreFocus, moodPreferences }) {
    // Check for required fields
    if (!fullName || !email || !password || !genreFocus) {
        throw new Error('Missing required reader details');
    }

    // Hash the password before saving
    const hashedPassword = await ReaderModel.hashPassword(password);

    // Create a new Reader instance (not yet saved to DB)
    const Reader = new ReaderModel({
        fullName,
        email,
        password: hashedPassword,
        genreFocus,
        moodPreferences
    });
    return Reader;
}

