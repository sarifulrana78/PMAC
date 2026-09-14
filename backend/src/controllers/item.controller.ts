import { Request, Response } from 'express';
import Experience from '../models/Experience';
import { AuthRequest } from '../middleware/auth';

// Create a new item (Experience)
export const createItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const creator = req.user?.userId;
    if (!creator) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const experienceData = { ...req.body, creator };
    const newExperience = new Experience(experienceData);
    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item', details: error });
  }
};

// Get all items
export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Experience.find().populate('creator', 'name email');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items', details: error });
  }
};

// Get a single item
export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Experience.findById(req.params.id).populate('creator', 'name email');
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item', details: error });
  }
};

// Update an item
export const updateItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const creator = req.user?.userId;
    const item = await Experience.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    if (item.creator.toString() !== creator) {
      res.status(403).json({ error: 'Forbidden. You can only update your own items.' });
      return;
    }
    
    const updatedItem = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item', details: error });
  }
};

// Delete an item
export const deleteItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const creator = req.user?.userId;
    const item = await Experience.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    if (item.creator.toString() !== creator) {
      res.status(403).json({ error: 'Forbidden. You can only delete your own items.' });
      return;
    }
    
    await Experience.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item', details: error });
  }
};
