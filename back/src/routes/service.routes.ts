import { Router } from 'express';
import * as serviceController from '../controllers/service.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 */

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Cria um novo serviço
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *   get:
 *     summary: Lista todos os serviços
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de serviços
 */

router.use(authenticateToken);

router.post('/', serviceController.create);
router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getById);
router.put('/:id', serviceController.update);
router.delete('/:id', serviceController.remove);

export default router;
