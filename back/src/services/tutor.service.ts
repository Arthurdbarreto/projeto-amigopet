import { Tutor } from '../models/tutor.model';
import { Pet } from '../models/pet.model';

export class TutorService {
  async create(data: any) {
    const tutor = new Tutor(data);
    return await tutor.save();
  }

  async findAll(filter: any, page: number, limit: number) {
    const tutors = await Tutor.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);
    const total = await Tutor.countDocuments(filter);
    return { tutors, total };
  }

  async findById(id: string) {
    return await Tutor.findById(id);
  }

  async update(id: string, data: any) {
    return await Tutor.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    const petsCount = await Pet.countDocuments({ tutorId: id });
    if (petsCount > 0) {
      throw { status: 400, message: 'Não é possível excluir um tutor que possui pets vinculados' };
    }
    return await Tutor.findByIdAndDelete(id);
  }
}
