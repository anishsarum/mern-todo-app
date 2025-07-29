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
    } catch (err: any) {
      setError(err.message || 'Failed to fetch todos');
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
    } catch (err: any) {
      setError(err.message || 'Failed to add todo');
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
      try {
        const todoToUpdate = todos.find((todo) => todo._id === id);
        if (todoToUpdate) {
          await updateTodoApi(id, { completed: !todoToUpdate.completed });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to update todo');
        console.error('Error updating todo:', err);
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    },
    [todos]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      try {
        await deleteTodoApi(id);
      } catch (err: any) {
        setError(err.message || 'Failed to delete todo');
        console.error('Error deleting todo:', err);
        fetchTodos();
      }
    },
    [fetchTodos]
  );

  return { todos, loading, error, addTodo, toggleTodo, deleteTodo, fetchTodos };
};
