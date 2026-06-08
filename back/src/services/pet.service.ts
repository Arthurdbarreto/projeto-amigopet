import { Pet } from '../models/pet.model';
import { Tutor } from '../models/tutor.model';

export class PetService {
  async create(data: any) {
    const tutor = await Tutor.findById(data.tutorId);
    if (!tutor) throw { status: 400, message: 'Tutor não encontrado' };
    const pet = new Pet(data);
    return await pet.save();
  }

  async findAll(filter: any, page: number, limit: number) {
    const pets = await Pet.find(filter)
      .populate('tutorId', 'name phone')
      .limit(limit)
      .skip((page - 1) * limit);
    const total = await Pet.countDocuments(filter);
    return { pets, total };
  }

  async findById(id: string) {
    return await Pet.findById(id).populate('tutorId');
  }

  async update(id: string, data: any) {
    if (data.tutorId) {
      const tutor = await Tutor.findById(data.tutorId);
      if (!tutor) throw { status: 400, message: 'Tutor não encontrado' };
    }
    return await Pet.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await Pet.findByIdAndDelete(id);
  }
}
