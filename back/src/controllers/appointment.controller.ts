import { Request, Response, NextFunction } from 'express';
import { AppointmentService } from '../services/appointment.service';

const appointmentService = new AppointmentService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointment = await appointmentService.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter = status ? { status } : {};
    const result = await appointmentService.findAll(filter, Number(page), Number(limit));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointment = await appointmentService.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Agendamento não encontrado' });
    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointment = await appointmentService.update(req.params.id, req.body);
    if (!appointment) return res.status(404).json({ message: 'Agendamento não encontrado' });
    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await appointmentService.delete(req.params.id);
    res.json({ message: 'Agendamento removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
