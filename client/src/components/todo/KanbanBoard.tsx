import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import type { TodosByStatus, TodoItem } from '../../types/Todo';
import { getStatusConfig } from '../../utils/todoUtils';
import TodoCard from './TodoCard';

interface KanbanBoardProps {
  todosByStatus: TodosByStatus;
  onDragEnd: (result: DropResult) => void;
  onEditTodo: (todo: TodoItem) => void;
  onDeleteTodo: (id: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  todosByStatus,
  onDragEnd,
  onEditTodo,
  onDeleteTodo,
}) => {
  const statusConfig = getStatusConfig(todosByStatus);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Mobile: Vertical Stack, Desktop: Grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
        {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => (
          <div key={status} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                {statusConfig[status].title}
              </h2>
              <span className="bg-slate-200 text-slate-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {statusConfig[status].count}
              </span>
            </div>

            {/* Droppable Column */}
            <Droppable droppableId={status}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] space-y-2 sm:space-y-3 p-2 sm:p-3 rounded-xl transition-all duration-200 ${
                    snapshot.isDraggingOver ? statusConfig[status].color : 'bg-slate-50'
                  }`}
                >
                  {todosByStatus[status].map((todo, index) => (
                    <TodoCard
                      key={todo._id}
                      todo={todo}
                      index={index}
                      onEdit={onEditTodo}
                      onDelete={onDeleteTodo}
                    />
                  ))}
                  {provided.placeholder}
                  
                  {/* Empty State */}
                  {todosByStatus[status].length === 0 && (
                    <div className="text-center py-6 sm:py-8 text-slate-400">
                      <div className="text-3xl sm:text-4xl mb-2">📋</div>
                      <p className="text-sm sm:text-base">Drop tasks here</p>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
