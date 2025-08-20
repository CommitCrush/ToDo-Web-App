import React, { useState, useEffect } from 'react';
import type { TodoItem } from '../../types/Todo';

interface EditTodoModalProps {
  todo: TodoItem | null;
  onClose: () => void;
  onUpdateTodo: (id: string, updates: Partial<TodoItem>) => Promise<boolean>;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  todo,
  onClose,
  onUpdateTodo,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    text: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: '',
  });

  // Update form data when todo changes
  useEffect(() => {
    if (todo) {
      setFormData({
        text: todo.text,
        description: todo.description || '',
        priority: todo.priority,
        dueDate: todo.dueDate || '',
      });
    }
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo || !formData.text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onUpdateTodo(todo._id, {
      text: formData.text,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate,
    });
    
    if (success) {
      onClose();
    }
    setIsSubmitting(false);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
      <div className="bg-white bg-opacity-98 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200">
        <h3 className="text-2xl font-bold mb-6">Edit Task</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.text}
            onChange={(e) => handleChange('text', e.target.value)}
            placeholder="Task title"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
            required
            disabled={isSubmitting}
          />
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Description (optional)"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500 h-24"
            disabled={isSubmitting}
          />
          <select
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
            disabled={isSubmitting}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
            disabled={isSubmitting}
          />
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!formData.text.trim() || isSubmitting}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Task'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
