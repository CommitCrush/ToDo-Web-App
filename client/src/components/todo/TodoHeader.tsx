import React from 'react';

interface TodoHeaderProps {
  title?: string;
  subtitle?: string;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ 
  title = "Task Board ✨",
  subtitle = "Drag and drop tasks between columns to update their status"
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold text-slate-800 mb-4">
        {title}
      </h1>
      <p className="text-xl text-slate-600">
        {subtitle}
      </p>
    </div>
  );
};

export default TodoHeader;
