import { Schema, model } from 'mongoose';

const imageGroupSchema = new Schema({
    name: { type: String, unique: true },
    variants: [{
        name: String,
        width: Number,
        height: Number,
        fit: String
    }],
});

export const ImageGroupModel = model('ImageGroup', imageGroupSchema);