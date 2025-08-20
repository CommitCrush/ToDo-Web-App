import React, { useState } from 'react';

interface QuickAddFormProps {
  onQuickAdd: (text: string) => Promise<boolean>;
  onShowDetailedForm: () => void;
}

const QuickAddForm: React.FC<QuickAddFormProps> = ({ 
  onQuickAdd, 
  onShowDetailedForm 
}) => {
  const [newTodo, setNewTodo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onQuickAdd(newTodo.trim());
    if (success) {
      setNewTodo('');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Quick add: What needs to be done?"
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-base sm:text-lg"
          disabled={isSubmitting}
        />
        <div className="flex gap-2 sm:gap-3">
          <button
            type="submit"
            disabled={!newTodo.trim() || isSubmitting}
            className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isSubmitting ? 'Adding...' : 'Quick Add ⚡'}
          </button>
          <button
            type="button"
            onClick={onShowDetailedForm}
            className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-200 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Detailed Add 📝</span>
            <span className="sm:hidden">Detail 📝</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickAddForm;
