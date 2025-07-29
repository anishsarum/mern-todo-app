import { useTodos } from './hooks/useTodos';
import { TodoForm, TodoList } from './components';

function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f7f6',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}
        >
          My MERN Stack To-Do List
        </h1>
        <TodoForm onAdd={addTodo} /> {/* Pass addTodo function to the form */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          loading={loading}
          error={error}
        />{' '}
        {/* Pass data and functions to the list */}
      </div>
    </div>
  );
}

export default App;
