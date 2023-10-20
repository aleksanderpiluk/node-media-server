import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
    group: { type: String },
    blob: { type: String },
    uploaded: { type: Date },
});

export const ImageModel = model('Image', imageSchema); 