import mongoose from 'mongoose';
import { BootError } from '../../error/boot.error.js';

const url = process.env.MONGODB_URL;
if (url === undefined) {
    throw new BootError('Cannot connect to database. MONGODB_URL is undefined');
}

await mongoose.connect(url);
