import { Schema, model, Document } from 'mongoose';

// Define the interface for a Todo document
// This ensures type safety for our Todo objects in TypeScript
export interface ITodo extends Document {
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Define the Mongoose Schema for the Todo
const TodoSchema = new Schema<ITodo>({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the Mongoose Model
const Todo = model<ITodo>('Todo', TodoSchema);

export default Todo;
