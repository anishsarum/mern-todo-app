import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todos';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb:27017/todos_db';

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Todo API is running!');
});

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
