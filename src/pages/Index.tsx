
import React from 'react';
import TodoList from '../components/TodoList';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-todo-background py-8 px-4">
      <div className="features-bar max-w-xl mx-auto">
        <div className="feature-item">Create and manage tasks in seconds</div>
        <div className="feature-item">Mark tasks as completed</div>
        <div className="feature-item">Track progress and achieve goals</div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <TodoList />
      </div>
      
      <footer className="footer max-w-xl mx-auto">
        <div>© 2025 Your To Do App. All rights reserved</div>
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <span className="text-gray-600 mx-2">•</span>
          <a href="#" className="footer-link">Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
