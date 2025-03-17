
import React, { useState } from 'react';
import { Check, Trash, Pencil } from 'lucide-react';
import { formatTimeAgo } from '../utils/timeUtils';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  
  const handleEditClick = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };
  
  const handleEditSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };
  
  return (
    <div className="todo-item group">
      <div className="flex items-center flex-1">
        <div 
          className={`todo-checkbox ${todo.completed ? 'todo-checkbox-checked' : ''}`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed && <Check size={12} className="text-white" />}
        </div>
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            className="ml-3 bg-gray-800 text-white py-1 px-2 rounded flex-1 outline-none border border-gray-600 focus:border-primary"
            autoFocus
          />
        ) : (
          <span className={`todo-text ${todo.completed ? 'todo-text-checked' : ''}`}>
            {todo.text}
          </span>
        )}
        
        {!isEditing && (
          <span className="todo-time">
            {formatTimeAgo(todo.createdAt)} ago
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        {!isEditing && (
          <>
            <button 
              className="todo-action-button"
              onClick={handleEditClick}
              aria-label="Edit task"
            >
              <Pencil size={16} />
            </button>
            <button 
              className="todo-action-button"
              onClick={() => onDelete(todo.id)}
              aria-label="Delete task"
            >
              <Trash size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
