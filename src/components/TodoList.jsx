import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ tasks }) => {
  return (
    <div className="mt-4 transition-all duration-700 overflow-auto">
      <div className="task-grid">
        {tasks.map((todo, index) => (
          <TodoListItem todo={todo} key={index} className="glass-card fade-in-up p-4" />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
