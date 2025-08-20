import React, { useState } from 'react';
import type { TodoItem } from '../types/Todo';
import { useTodos } from '../hooks/useTodos';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TodoHeader from '../components/todo/TodoHeader';
import QuickAddForm from '../components/todo/QuickAddForm';
import DetailedAddModal from '../components/todo/DetailedAddModal';
import EditTodoModal from '../components/todo/EditTodoModal';
import KanbanBoard from '../components/todo/KanbanBoard';
import TodoStats from '../components/todo/TodoStats';

const Todo: React.FC = () => {
  const {
    todos,
    todosByStatus,
    loading,
    error,
    addQuickTodo,
    addDetailedTodo,
    updateTodo,
    deleteTodo,
    handleDragEnd,
    clearError,
  } = useTodos();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);

  // Handle showing detailed add form
  const handleShowDetailedForm = () => {
    setShowAddForm(true);
  };

  // Handle closing detailed add form
  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  // Handle editing a todo
  const handleEditTodo = (todo: TodoItem) => {
    setEditingTodo(todo);
  };

  // Handle closing edit modal
  const handleCloseEditModal = () => {
    setEditingTodo(null);
  };

  // Show loading spinner
  if (loading) {
    return <LoadingSpinner message="Loading your todos..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <TodoHeader />

        {/* Error Display */}
        {error && (
          <div className="mb-4 sm:mb-6 bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <span className="text-sm sm:text-base">{error}</span>
            <button
              onClick={clearError}
              className="text-red-700 hover:text-red-900 font-bold text-lg self-end sm:self-center"
            >
              ×
            </button>
          </div>
        )}

        {/* Quick Add Form */}
        <div className="mb-6 lg:mb-8">
          <QuickAddForm
            onQuickAdd={addQuickTodo}
            onShowDetailedForm={handleShowDetailedForm}
          />
        </div>

        {/* Kanban Board */}
        <div className="mb-6 lg:mb-8">
          <KanbanBoard
            todosByStatus={todosByStatus}
            onDragEnd={handleDragEnd}
            onEditTodo={handleEditTodo}
            onDeleteTodo={deleteTodo}
          />
        </div>

        {/* Todo Statistics */}
        <TodoStats todos={todos} />

        {/* Detailed Add Modal */}
        <DetailedAddModal
          isOpen={showAddForm}
          onClose={handleCloseAddForm}
          onAddTodo={addDetailedTodo}
        />

        {/* Edit Todo Modal */}
        <EditTodoModal
          todo={editingTodo}
          onClose={handleCloseEditModal}
          onUpdateTodo={updateTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
