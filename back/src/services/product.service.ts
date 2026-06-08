import { Product } from '../models/product.model';

export class ProductService {
  async create(data: any) {
    const product = new Product(data);
    return await product.save();
  }

  async findAll(filter: any, page: number, limit: number) {
    const products = await Product.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);
    const total = await Product.countDocuments(filter);
    return { products, total };
  }

  async findById(id: string) {
    return await Product.findById(id);
  }

  async update(id: string, data: any) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}
