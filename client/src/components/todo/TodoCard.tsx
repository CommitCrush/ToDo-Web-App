import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import type { TodoItem } from '../../types/Todo';
import { getPriorityColor, formatDate, formatCreationDate } from '../../utils/todoUtils';

interface TodoCardProps {
  todo: TodoItem;
  index: number;
  onEdit: (todo: TodoItem) => void;
  onDelete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  index,
  onEdit,
  onDelete,
}) => {
  return (
    <Draggable key={todo._id} draggableId={todo._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-xl p-4 shadow-sm border-l-4 transition-all duration-200 cursor-pointer ${
            getPriorityColor(todo.priority)
          } ${
            snapshot.isDragging
              ? 'rotate-2 scale-105 shadow-lg'
              : 'hover:shadow-md'
          }`}
        >
          <div className="space-y-2">
            {/* Task Title */}
            <h3 className="font-semibold text-slate-800">{todo.text}</h3>
            
            {/* Task Description */}
            {todo.description && (
              <p className="text-sm text-slate-600">{todo.description}</p>
            )}

            {/* Task Meta */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="capitalize">{todo.priority} priority</span>
                {todo.dueDate && (
                  <span>Due: {formatDate(todo.dueDate)}</span>
                )}
              </div>
              {/* Creation Date */}
              <div className="text-xs text-slate-400">
                Created: {formatCreationDate(todo.createdAt)}
              </div>
            </div>

            {/* Task Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(todo);
                }}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                Edit ✏️
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(todo._id);
                }}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Delete 🗑️
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoCard;
