const { Router } = require('express');
const authRoutes = require('./authRoutes');
const agendamentoRoutes = require('./agendamentoRoutes');
const healthRoutes = require('./healthRoutes');
const petRoutes = require('./petRoutes');
const produtoRoutes = require('./produtoRoutes');
const servicoRoutes = require('./servicoRoutes');
const tutorRoutes = require('./tutorRoutes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/agendamentos', agendamentoRoutes);
router.use('/health', healthRoutes);
router.use('/pets', petRoutes);
router.use('/produtos', produtoRoutes);
router.use('/servicos', servicoRoutes);
router.use('/tutores', tutorRoutes);

module.exports = router;
