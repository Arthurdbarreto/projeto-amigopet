const { Router } = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticacao e sessao de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         perfil:
 *           type: string
 *           enum: [ADMIN, ATENDENTE, VETERINARIO, ESTOQUE]
 *         ativo:
 *           type: boolean
 *     AuthTokens:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 *         tokenType:
 *           type: string
 *           example: Bearer
 *         expiresIn:
 *           type: string
 *           example: 1d
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastra um novo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Silva
 *               email:
 *                 type: string
 *                 example: maria@amigopet.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: Senha123
 *               perfil:
 *                 type: string
 *                 enum: [ADMIN, ATENDENTE, VETERINARIO, ESTOQUE]
 *                 example: ATENDENTE
 *     responses:
 *       201:
 *         description: Usuario cadastrado
 *       400:
 *         description: Dados invalidos
 *       409:
 *         description: Email ja cadastrado
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@amigopet.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: Senha123
 *     responses:
 *       200:
 *         description: Login realizado
 *       401:
 *         description: Credenciais invalidas
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Renova access token usando refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token renovado
 *       401:
 *         description: Refresh token invalido
 */
router.post('/refresh', authController.refresh);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna o usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: Nao autorizado
 */
router.get('/me', authMiddleware, authController.me);

module.exports = router;
