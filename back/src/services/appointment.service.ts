import { Appointment } from '../models/appointment.model';
import { Pet } from '../models/pet.model';
import { Service } from '../models/service.model';

export class AppointmentService {
  async create(data: any) {
    const pet = await Pet.findById(data.petId);
    if (!pet) throw { status: 400, message: 'Pet não encontrado' };
    
    const service = await Service.findById(data.serviceId);
    if (!service) throw { status: 400, message: 'Serviço não encontrado' };

    const appointment = new Appointment({
      ...data,
      tutorId: pet.tutorId
    });
    return await appointment.save();
  }

  async findAll(filter: any, page: number, limit: number) {
    const appointments = await Appointment.find(filter)
      .populate('tutorId', 'name phone')
      .populate('petId', 'name species')
      .populate('serviceId', 'name price')
      .sort({ dataHora: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    const total = await Appointment.countDocuments(filter);
    return { appointments, total };
  }

  async findById(id: string) {
    return await Appointment.findById(id)
      .populate('tutorId')
      .populate('petId')
      .populate('serviceId');
  }

  async update(id: string, data: any) {
    return await Appointment.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await Appointment.findByIdAndDelete(id);
  }
}
