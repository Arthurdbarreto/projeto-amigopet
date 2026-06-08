import { Schema, model } from 'mongoose';

const petSchema = new Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  sex: { type: String, enum: ['Macho', 'Fêmea'] },
  tutorId: { type: Schema.Types.ObjectId, ref: 'Tutor', required: true },
}, { timestamps: true });

export const Pet = model('Pet', petSchema);
