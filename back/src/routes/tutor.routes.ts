import { Router } from 'express';
import * as tutorController from '../controllers/tutor.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tutor:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         contact:
 *           type: string
 *         address:
 *           type: string
 */

/**
 * @swagger
 * /tutors:
 *   post:
 *     summary: Cria um novo tutor
 *     tags: [Tutores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tutor'
 *     responses:
 *       201:
 *         description: Tutor criado com sucesso
 *   get:
 *     summary: Lista todos os tutores
 *     tags: [Tutores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de tutores
 */

router.use(authenticateToken);

router.post('/', tutorController.create);
router.get('/', tutorController.getAll);
router.get('/:id', tutorController.getById);
router.put('/:id', tutorController.update);
router.delete('/:id', tutorController.remove);

export default router;
