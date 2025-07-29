import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo'; // Import our Todo model

/**
 * Extracts a user-friendly error message from an unknown error type.
 * This helper centralizes error message handling.
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  // For cases where an error might be thrown as a string or other primitive
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred.';
};

// Get all todos
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find(); // Find all documents in the 'todos' collection
    res.status(200).json(todos); // Send them back as JSON
  } catch (error: unknown) {
    // Changed from 'any' to 'unknown'
    const message = getErrorMessage(error); // Use the helper
    res.status(500).json({ message });
  }
};

// Create a new todo
export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text } = req.body; // Get 'text' from the request body
  if (!text) {
    res.status(400).json({ message: 'Text is required to create a todo.' });
    return;
  }

  const newTodo: ITodo = new Todo({ text }); // Create a new Todo instance
  try {
    const savedTodo = await newTodo.save(); // Save it to MongoDB
    res.status(201).json(savedTodo); // Send back the created todo with 201 status
  } catch (error: unknown) {
    // Changed from 'any' to 'unknown'
    const message = getErrorMessage(error); // Use the helper
    res.status(500).json({ message });
  }
};

// Update an existing todo (e.g., toggle completed status)
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Get the todo ID from the URL parameters
  const { text, completed } = req.body; // Get optional text/completed from body

  try {
    const todo = await Todo.findById(id); // Find the todo by ID

    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    if (text !== undefined) todo.text = text;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodo = await todo.save(); // Save the updated todo
    res.status(200).json(updatedTodo);
  } catch (error: unknown) {
    // Changed from 'any' to 'unknown'
    const message = getErrorMessage(error); // Use the helper
    res.status(500).json({ message });
  }
};

// Delete a todo
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Get the todo ID from the URL parameters

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id); // Find and delete

    if (!deletedTodo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error: unknown) {
    // Changed from 'any' to 'unknown'
    const message = getErrorMessage(error); // Use the helper
    res.status(500).json({ message });
  }
};
