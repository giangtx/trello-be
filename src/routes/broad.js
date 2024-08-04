import express from 'express';
import * as broadController from '../controllers/broad.js';

const router = express.Router();

router.get('/', broadController.index);
router.post('/', broadController.create);
router.get('/:id', broadController.show);
router.put('/:id', broadController.update);
router.put('/:id/columns', broadController.addColumn);
router.put('/:id/position', broadController.updatePosition);
router.put('/items/:id', broadController.updateItem);
router.put('/columns/:id/items', broadController.addItem);

export default router;