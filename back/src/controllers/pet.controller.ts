import { Request, Response, NextFunction } from 'express';
import { PetService } from '../services/pet.service';

const petService = new PetService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pet = await petService.create(req.body);
    res.status(201).json(pet);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    const filter = name ? { name: new RegExp(name as string, 'i') } : {};
    const result = await petService.findAll(filter, Number(page), Number(limit));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pet = await petService.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet não encontrado' });
    res.json(pet);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pet = await petService.update(req.params.id, req.body);
    if (!pet) return res.status(404).json({ message: 'Pet não encontrado' });
    res.json(pet);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await petService.delete(req.params.id);
    res.json({ message: 'Pet removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
