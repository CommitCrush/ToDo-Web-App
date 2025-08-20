import React from 'react';
import type { TodoItem } from '../../types/Todo';
import { calculateTodoStats } from '../../utils/todoUtils';

interface TodoStatsProps {
  todos: TodoItem[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const stats = calculateTodoStats(todos);

  if (todos.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
        <div>
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-slate-600">Total Tasks</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-600">{stats.todo}</div>
          <div className="text-slate-600">To Do</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
          <div className="text-slate-600">In Progress</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-600">{stats.done}</div>
          <div className="text-slate-600">Done</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-600">{stats.completionRate}%</div>
          <div className="text-slate-600">Completion</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
