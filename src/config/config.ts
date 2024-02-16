import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';

export const MONGO_USER = process.env.MONGO_USER || 'superuser2';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'roseville';
export const MONGO_URL = process.env.MONGO_URL || 'cluster0.wdxayfs.mongodb.net/test';
export const MONGO_TABLE = process.env.MONGO_TABLE || 'test';
export const MONGO_OPTIONS: mongoose.ConnectOptions = { retryWrites: true, w: 'majority' };

export const mongo = {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_URL,
    MONGO_TABLE,
    MONGO_OPTIONS,
    MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_TABLE}`
};
