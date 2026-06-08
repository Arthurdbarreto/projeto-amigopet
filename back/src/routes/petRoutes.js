const { Router } = require('express');
const petController = require('../controllers/petController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use(authMiddleware);

router.post('/', petController.create);
router.get('/', petController.findAll);
router.get('/:id', petController.findById);
router.put('/:id', petController.update);
router.delete('/:id', petController.remove);

module.exports = router;
