import mongoose, { Schema } from 'mongoose';

export const bookSchema = new Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true }
});

export const Book = mongoose.model('Book', bookSchema);
