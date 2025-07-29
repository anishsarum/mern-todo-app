import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // For enabling cross-origin requests from your frontend

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/todos_db';

// Middleware
app.use(cors()); // Allow your frontend to talk to your backend
app.use(express.json()); // To parse JSON bodies from requests

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Todo API is running!');
});

// TODO: Import and use todo routes here

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
