import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import itemRoutes from './routes/items';

dotenv.config();

const app = express();
// Default port is 5000 if not specified in .env
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MindTrip AI API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mindtrip')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
