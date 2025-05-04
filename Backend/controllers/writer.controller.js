import WriterModel from "../models/writer.model.js";
import { createWriter } from "../services/writer.service.js";
import { validationResult } from "express-validator";

// Controller for registering a new writer
const registerWriter = async (req, res, next) => {
    try {
        // Validate request body using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // Extract fields from request body
        const { fullName, email, password, genreFocus, penName, shortBio } = req.body;

        // Create a new writer instance (not yet saved)
        const writer = await createWriter({ fullName, email, password, genreFocus, penName, shortBio });

        // Generate authentication token for the writer
        const token = await writer.generateAuthToken();

        // Save the writer to the database
        await writer.save();

        // Send success response with writer info and token
        res.status(201).json({ message: "Writer registered successfully", writer, token });
    } catch (error) {
        // Pass errors to error handling middleware
        next(error);
    }
}

// Export controller methods
export default { registerWriter };

