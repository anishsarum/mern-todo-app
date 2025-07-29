import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred.';
};

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    res.status(500).json({ message });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: 'Text is required to create a todo.' });
    return;
  }

  const newTodo: ITodo = new Todo({ text });
  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    res.status(500).json({ message });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    if (text !== undefined) todo.text = text;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    res.status(500).json({ message });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    res.status(500).json({ message });
  }
};
