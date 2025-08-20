import { useState, useEffect } from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import type { TodoItem, NewTodoForm } from '../types/Todo';
import { TodoService } from '../services/todoService';
import { organizeTodosByStatus } from '../utils/todoUtils';

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TodoService.fetchTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a quick todo
  const addQuickTodo = async (text: string) => {
    try {
      const newTodo = await TodoService.addQuickTodo(text);
      setTodos(prev => [...prev, newTodo]);
      return true;
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
      return false;
    }
  };

  // Add a detailed todo
  const addDetailedTodo = async (todoData: NewTodoForm) => {
    try {
      const newTodo = await TodoService.addDetailedTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
      return true;
    } catch (err) {
      setError('Failed to add detailed todo');
      console.error('Error adding detailed todo:', err);
      return false;
    }
  };

  // Update a todo
  const updateTodo = async (id: string, updates: Partial<TodoItem>) => {
    try {
      const updatedTodo = await TodoService.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
      return true;
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
      return false;
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
      return false;
    }
  };

  // Handle drag and drop
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;
    const newStatus = destination.droppableId as TodoItem['status'];
    
    // Find the todo being moved
    const todo = todos.find(t => t._id === draggableId);
    if (!todo || todo.status === newStatus) return;

    // Update the todo status
    await updateTodo(draggableId, { status: newStatus });
  };

  // Toggle todo completion status
  const toggleTodoCompletion = async (id: string) => {
    const todo = todos.find(t => t._id === id);
    if (!todo) return false;
    
    const newStatus = todo.status === 'done' ? 'todo' : 'done';
    return await updateTodo(id, { status: newStatus });
  };

  // Clear error
  const clearError = () => setError(null);

  // Get organized todos
  const todosByStatus = organizeTodosByStatus(todos);

  return {
    // State
    todos,
    todosByStatus,
    loading,
    error,

    // Actions
    fetchTodos,
    addQuickTodo,
    addDetailedTodo,
    updateTodo,
    deleteTodo,
    handleDragEnd,
    toggleTodoCompletion,
    clearError,
  };
};
