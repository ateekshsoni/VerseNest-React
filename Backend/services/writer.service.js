import writerModel from '../models/writer.model.js';

// Service function to create a new Writer instance
export async function createWriter({ fullName, email, password, genreFocus, penName, shortBio }) {
    // Check for required fields
    if (!fullName || !email || !password || !genreFocus) {
        throw new Error('Missing required writer details');
    }

    // Hash the password before saving
    const hashedPassword = await writerModel.hashPassword(password);

    // Create a new Writer instance (not yet saved to DB)
    const Writer = new writerModel({
        fullName,
        email,
        password: hashedPassword,
        genreFocus,
        penName,
        shortBio
    });
    return Writer;
}
