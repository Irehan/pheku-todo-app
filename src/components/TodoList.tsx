import React, { useState, useEffect } from 'react';
import TodoItem, { Todo } from './TodoItem';
import TodoInput from './TodoInput';
import Notification from './Notification';
import { getRandomMessage } from '../utils/timeUtils';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage on initial render
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        // Parse the JSON and convert string dates back to Date objects
        return JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
        return [];
      }
    }
    return [];
  });
  
  const [notification, setNotification] = useState({
    message: '',
    isVisible: false
  });

  const [title, setTitle] = useState(() => {
    const savedTitle = localStorage.getItem('todoTitle');
    return savedTitle || 'Todo list';
  });
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Save title to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('todoTitle', title);
  }, [title]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
    
    // Show notification
    setNotification({
      message: `${getRandomMessage()}`,
      isVisible: true
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="todo-card animate-fade-in">
      {isEditingTitle ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
          className="page-title bg-transparent border-b border-gray-500 outline-none w-full"
          autoFocus
        />
      ) : (
        <h1 
          className="page-title cursor-pointer hover:text-primary transition-colors" 
          onClick={handleTitleClick}
        >
          {title}
        </h1>
      )}
      
      <Notification 
        message={notification.message}
        isVisible={notification.isVisible}
        onHide={hideNotification}
      />
      
      <TodoInput onAddTodo={addTodo} />
      
      <div className="space-y-1">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks yet. Add one to get started!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;