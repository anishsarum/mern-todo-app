import React, { useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', marginBottom: '20px' }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
        style={{
          flexGrow: 1,
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          marginRight: '10px',
          fontSize: '1em',
        }}
      />
      <button
        type="submit"
        style={{
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
        }}
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
