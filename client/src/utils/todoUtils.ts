import type { TodoItem, TodosByStatus, StatusConfig, TodoPriority } from '../types/Todo';

// Organize todos by status for Kanban board
export const organizeTodosByStatus = (todos: TodoItem[]): TodosByStatus => {
  return {
    todo: todos.filter(todo => todo.status === 'todo'),
    'in-progress': todos.filter(todo => todo.status === 'in-progress'),
    done: todos.filter(todo => todo.status === 'done'),
  };
};

// Status configuration for Kanban columns
export const getStatusConfig = (todosByStatus: TodosByStatus): Record<keyof TodosByStatus, StatusConfig> => {
  return {
    todo: {
      title: '📋 To Do',
      color: 'bg-slate-100',
      borderColor: 'border-slate-300',
      count: todosByStatus.todo.length,
    },
    'in-progress': {
      title: '🚀 In Progress',
      color: 'bg-blue-50',
      borderColor: 'border-blue-300',
      count: todosByStatus['in-progress'].length,
    },
    done: {
      title: '✅ Done',
      color: 'bg-green-50',
      borderColor: 'border-green-300',
      count: todosByStatus.done.length,
    },
  };
};

// Get priority color classes
export const getPriorityColor = (priority: TodoPriority): string => {
  switch (priority) {
    case 'high': 
      return 'border-l-red-500 bg-red-50';
    case 'medium': 
      return 'border-l-yellow-500 bg-yellow-50';
    case 'low': 
      return 'border-l-green-500 bg-green-50';
    default: 
      return 'border-l-gray-500 bg-gray-50';
  }
};

// Format date for display
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

// Format creation date with day name
export const formatCreationDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
};

// Calculate todo statistics
export const calculateTodoStats = (todos: TodoItem[]) => {
  const todosByStatus = organizeTodosByStatus(todos);
  
  return {
    total: todos.length,
    todo: todosByStatus.todo.length,
    inProgress: todosByStatus['in-progress'].length,
    done: todosByStatus.done.length,
    completionRate: todos.length > 0 ? Math.round((todosByStatus.done.length / todos.length) * 100) : 0,
  };
};
