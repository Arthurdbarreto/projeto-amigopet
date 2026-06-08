const { Router } = require('express');
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use(authMiddleware);

router.post('/', produtoController.create);
router.get('/', produtoController.findAll);
router.get('/:id', produtoController.findById);
router.put('/:id', produtoController.update);
router.delete('/:id', produtoController.remove);

module.exports = router;
