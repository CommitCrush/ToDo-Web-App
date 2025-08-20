import type { TodoItem, NewTodoForm } from '../types/Todo';

const API_URL = import.meta.env.VITE_API_URL;

export class TodoService {
  // Fetch all todos
  static async fetchTodos(): Promise<TodoItem[]> {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  // Add a new todo (quick add)
  static async addQuickTodo(text: string): Promise<TodoItem> {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  // Add a detailed todo
  static async addDetailedTodo(todoData: NewTodoForm): Promise<TodoItem> {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(todoData),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding detailed todo:', error);
      throw error;
    }
  }

  // Update a todo
  static async updateTodo(id: string, updates: Partial<TodoItem>): Promise<TodoItem> {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  // Delete a todo
  static async deleteTodo(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}
