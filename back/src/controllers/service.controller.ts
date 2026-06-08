import { Request, Response, NextFunction } from 'express';
import { ServiceService } from '../services/service.service';

const serviceService = new ServiceService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await serviceService.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    const filter = name ? { name: new RegExp(name as string, 'i') } : {};
    const result = await serviceService.findAll(filter, Number(page), Number(limit));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await serviceService.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json(service);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await serviceService.update(req.params.id, req.body);
    if (!service) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json(service);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await serviceService.delete(req.params.id);
    res.json({ message: 'Serviço removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
