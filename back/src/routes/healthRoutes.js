const { Router } = require('express');
const healthController = require('../controllers/healthController');

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica a saude da API
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API operacional
 */
router.get('/', healthController.getHealth);

module.exports = router;
