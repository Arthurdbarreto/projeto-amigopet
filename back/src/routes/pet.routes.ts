import { Router } from 'express';
import * as petController from '../controllers/pet.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - species
 *         - sex
 *         - tutorId
 *       properties:
 *         name:
 *           type: string
 *         species:
 *           type: string
 *         breed:
 *           type: string
 *         sex:
 *           type: string
 *           enum: [Macho, Fêmea]
 *         tutorId:
 *           type: string
 */

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Cria um novo pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 *   get:
 *     summary: Lista todos os pets
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pets
 */

router.use(authenticateToken);

router.post('/', petController.create);
router.get('/', petController.getAll);
router.get('/:id', petController.getById);
router.put('/:id', petController.update);
router.delete('/:id', petController.remove);

export default router;
