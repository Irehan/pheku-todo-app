
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (trimmedValue) {
      onAddTodo(trimmedValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="todo-input"
        placeholder="What's on your mind? Type your task..."
      />
      <button 
        type="submit"
        className="todo-add-button"
        aria-label="Add task"
      >
        <Plus size={18} strokeWidth={3} />
      </button>
    </form>
  );
};

export default TodoInput;
