import { Request, Response, NextFunction } from 'express';
import { Pet } from '../models/pet.model';
import { Tutor } from '../models/tutor.model';
import { Service } from '../models/service.model';
import { Product } from '../models/product.model';
import { Appointment } from '../models/appointment.model';

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalPets,
      totalTutors,
      totalServices,
      totalProducts,
      appointmentsToday,
      latestAppointments,
      lowStockProducts,
      upcomingServices
    ] = await Promise.all([
      Pet.countDocuments(),
      Tutor.countDocuments(),
      Service.countDocuments(),
      Product.countDocuments(),
      Appointment.countDocuments({
        dataHora: { $gte: today, $lt: tomorrow }
      }),
      Appointment.find()
        .populate('petId', 'name')
        .populate('serviceId', 'name')
        .sort({ createdAt: -1 })
        .limit(5),
      Product.find({ stock: { $lt: 10 } }).limit(5),
      Appointment.find({
        dataHora: { $gte: new Date() },
        status: 'Confirmado'
      })
      .populate('petId', 'name')
      .populate('serviceId', 'name')
      .sort({ dataHora: 1 })
      .limit(5)
    ]);

    res.json({
      cards: {
        totalPets,
        totalTutors,
        totalServices,
        totalProducts,
        appointmentsToday
      },
      widgets: {
        latestAppointments,
        lowStockProducts,
        upcomingServices
      }
    });
  } catch (error) {
    next(error);
  }
};
