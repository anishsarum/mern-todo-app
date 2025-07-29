import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
  text: string;
  completed: boolean;
  createdAt: Date;
}

const TodoSchema = new Schema<ITodo>({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Todo = model<ITodo>('Todo', TodoSchema);

export default Todo;
