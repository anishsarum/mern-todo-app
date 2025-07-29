import React from 'react';
import { ITodo } from '../types/todo.d';

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #eee',
        backgroundColor: todo.completed ? '#f0f0f0' : 'white',
        borderRadius: '5px',
        marginBottom: '5px',
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
        style={{ marginRight: '10px', cursor: 'pointer' }}
      />
      <span
        style={{
          flexGrow: 1,
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#888' : '#333',
          fontSize: '1.1em',
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo._id)}
        style={{
          background: '#ff4d4d',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
