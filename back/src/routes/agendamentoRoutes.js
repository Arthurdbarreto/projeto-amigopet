const { Router } = require('express');
const agendamentoController = require('../controllers/agendamentoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use(authMiddleware);

router.post('/', agendamentoController.create);
router.get('/', agendamentoController.findAll);
router.get('/:id', agendamentoController.findById);
router.put('/:id', agendamentoController.update);
router.delete('/:id', agendamentoController.remove);

module.exports = router;
