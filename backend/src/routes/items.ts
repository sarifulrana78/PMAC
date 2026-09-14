import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} from '../controllers/item.controller';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', authenticate, createItem);
router.put('/:id', authenticate, updateItem);
router.delete('/:id', authenticate, deleteItem);

export default router;
