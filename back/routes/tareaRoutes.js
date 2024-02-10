const express = require('express');
const router = express.Router();
const TareaController = require('../controllers/tareaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, TareaController.getTareas);
router.get('/:tareaId', authMiddleware, TareaController.getTareaId);
router.post('/', authMiddleware, TareaController.insertTarea);
router.put('/:tareaId', authMiddleware, TareaController.updateTarea);
router.delete('/:tareaId', authMiddleware, TareaController.deleteTarea);

module.exports = router;