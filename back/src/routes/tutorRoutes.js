const { Router } = require('express');
const tutorController = require('../controllers/tutorController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use(authMiddleware);

router.post('/', tutorController.create);
router.get('/', tutorController.findAll);
router.get('/:id', tutorController.findById);
router.put('/:id', tutorController.update);
router.delete('/:id', tutorController.remove);

module.exports = router;
