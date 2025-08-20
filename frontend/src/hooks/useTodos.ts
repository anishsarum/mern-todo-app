const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred.';
};

import { useState, useEffect, useCallback } from 'react';
import { ITodo } from '../types/todo.d';
import {
  getTodosApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from '../api/todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodosApi();
      setTodos(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (text: string) => {
    try {
      const newTodo = await createTodoApi(text);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      console.error('Error adding todo:', err);
    }
  }, []);

  const toggleTodo = useCallback(
    async (id: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      const originalTodos = todos;

      try {
        const todoToUpdate = originalTodos.find((todo) => todo._id === id);
        if (todoToUpdate) {
          await updateTodoApi(id, { completed: !todoToUpdate.completed });
        }
      } catch (err: unknown) {
        setError(getErrorMessage(err));
        console.error('Error updating todo:', err);
        setTodos(originalTodos);
      }
    },
    [todos]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      const originalTodos = todos;
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      try {
        await deleteTodoApi(id);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
        console.error('Error deleting todo:', err);
        setTodos(originalTodos);
      }
    },
    [todos]
  );

  return { todos, loading, error, addTodo, toggleTodo, deleteTodo, fetchTodos };
};
