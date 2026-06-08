import { Request, Response, NextFunction } from 'express';
import { TutorService } from '../services/tutor.service';

const tutorService = new TutorService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tutor = await tutorService.create(req.body);
    res.status(201).json(tutor);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    const filter = name ? { name: new RegExp(name as string, 'i') } : {};
    const result = await tutorService.findAll(filter, Number(page), Number(limit));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tutor = await tutorService.findById(req.params.id);
    if (!tutor) return res.status(404).json({ message: 'Tutor não encontrado' });
    res.json(tutor);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tutor = await tutorService.update(req.params.id, req.body);
    if (!tutor) return res.status(404).json({ message: 'Tutor não encontrado' });
    res.json(tutor);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await tutorService.delete(req.params.id);
    res.json({ message: 'Tutor removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
