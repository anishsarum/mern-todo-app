import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todos'; // <--- Make sure this line is here

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb:27017/todos_db';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route (optional, but harmless to keep)
app.get('/', (req, res) => {
  res.send('Todo API is running!');
});

// Use todo routes with /api/todos prefix
app.use('/api/todos', todoRoutes); // <--- Make sure THIS LINE is here

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
