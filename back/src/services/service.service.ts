import { Service } from '../models/service.model';

export class ServiceService {
  async create(data: any) {
    const service = new Service(data);
    return await service.save();
  }

  async findAll(filter: any, page: number, limit: number) {
    const services = await Service.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);
    const total = await Service.countDocuments(filter);
    return { services, total };
  }

  async findById(id: string) {
    return await Service.findById(id);
  }

  async update(id: string, data: any) {
    return await Service.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await Service.findByIdAndDelete(id);
  }
}
