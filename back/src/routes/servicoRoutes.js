const { Router } = require('express');
const servicoController = require('../controllers/servicoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use(authMiddleware);

router.post('/', servicoController.create);
router.get('/', servicoController.findAll);
router.get('/:id', servicoController.findById);
router.put('/:id', servicoController.update);
router.delete('/:id', servicoController.remove);

module.exports = router;
