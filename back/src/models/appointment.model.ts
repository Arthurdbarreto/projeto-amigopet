import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
  tutorId: { type: Schema.Types.ObjectId, ref: 'Tutor', required: true },
  petId: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  dataHora: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Pendente', 'Confirmado', 'Concluido', 'Cancelado'],
    default: 'Pendente'
  },
}, { timestamps: true });

export const Appointment = model('Appointment', appointmentSchema);
