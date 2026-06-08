import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    const filter = name ? { name: new RegExp(name as string, 'i') } : {};
    const result = await productService.findAll(filter, Number(page), Number(limit));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productService.delete(req.params.id);
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
