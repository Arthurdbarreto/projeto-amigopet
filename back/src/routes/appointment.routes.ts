import { Router } from 'express';
import * as appointmentController from '../controllers/appointment.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - petId
 *         - serviceId
 *         - dataHora
 *       properties:
 *         petId:
 *           type: string
 *         serviceId:
 *           type: string
 *         dataHora:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [Pendente, Confirmado, Concluido, Cancelado]
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *   get:
 *     summary: Lista todos os agendamentos
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 */

router.use(authenticateToken);

router.post('/', appointmentController.create);
router.get('/', appointmentController.getAll);
router.get('/:id', appointmentController.getById);
router.put('/:id', appointmentController.update);
router.delete('/:id', appointmentController.remove);

export default router;
