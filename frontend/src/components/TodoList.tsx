import React from 'react';
import { ITodo } from '../types/todo.d';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: ITodo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  loading,
  error,
}) => {
  if (loading) {
    return <p>Loading todos...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (todos.length === 0) {
    return <p>No todos yet. Add one above!</p>;
  }

  return (
    <div style={{ width: '100%' }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
