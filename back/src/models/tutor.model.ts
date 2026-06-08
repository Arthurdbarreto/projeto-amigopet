import { Schema, model } from 'mongoose';

const tutorSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  contact: { type: String },
  address: { type: String },
}, { timestamps: true });

export const Tutor = model('Tutor', tutorSchema);
