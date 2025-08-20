import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

interface TodoItem {
  _id: string;
  text: string;
  description?: string;
  completed: boolean;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [newTodoForm, setNewTodoForm] = useState({
    text: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: '',
    tags: [] as string[],
  });

  // Organize todos by status for Kanban board
  const todosByStatus = {
    todo: todos.filter(todo => todo.status === 'todo'),
    'in-progress': todos.filter(todo => todo.status === 'in-progress'),
    done: todos.filter(todo => todo.status === 'done'),
  };

  const statusConfig = {
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

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo (quick add)
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ text: newTodo }),
      });

      if (response.ok) {
        const todo = await response.json();
        setTodos([...todos, todo]);
        setNewTodo('');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Add detailed todo
  const addDetailedTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoForm.text.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newTodoForm),
      });

      if (response.ok) {
        const todo = await response.json();
        setTodos([...todos, todo]);
        setNewTodoForm({
          text: '',
          description: '',
          priority: 'medium',
          dueDate: '',
          tags: [],
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Update todo
  const updateTodo = async (id: string, updates: Partial<TodoItem>) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map(todo => 
          todo._id === id ? updatedTodo : todo
        ));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Handle drag and drop between columns
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

  // Toggle todo completion
  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t._id === id);
    if (!todo) return;
    
    const newStatus = todo.status === 'done' ? 'todo' : 'done';
    await updateTodo(id, { status: newStatus });
  };

  // Priority colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading your todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Task Board ✨
          </h1>
          <p className="text-xl text-slate-600">
            Drag and drop tasks between columns to update their status
          </p>
        </div>

        {/* Quick Add Todo Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={addTodo} className="flex gap-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Quick add: What needs to be done?"
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200"
            >
              Quick Add ⚡
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200"
            >
              Detailed Add �
            </button>
          </form>
        </div>

        {/* Detailed Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-6">Add Detailed Task</h3>
              <form onSubmit={addDetailedTodo} className="space-y-4">
                <input
                  type="text"
                  value={newTodoForm.text}
                  onChange={(e) => setNewTodoForm({...newTodoForm, text: e.target.value})}
                  placeholder="Task title"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                  required
                />
                <textarea
                  value={newTodoForm.description}
                  onChange={(e) => setNewTodoForm({...newTodoForm, description: e.target.value})}
                  placeholder="Description (optional)"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500 h-24"
                />
                <select
                  value={newTodoForm.priority}
                  onChange={(e) => setNewTodoForm({...newTodoForm, priority: e.target.value as 'low' | 'medium' | 'high'})}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  value={newTodoForm.dueDate}
                  onChange={(e) => setNewTodoForm({...newTodoForm, dueDate: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Add Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => (
              <div key={status} className="bg-white rounded-2xl shadow-lg p-6">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">
                    {statusConfig[status].title}
                  </h2>
                  <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                    {statusConfig[status].count}
                  </span>
                </div>

                {/* Droppable Column */}
                <Droppable droppableId={status}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[400px] space-y-3 p-3 rounded-xl transition-all duration-200 ${
                        snapshot.isDraggingOver ? statusConfig[status].color : 'bg-slate-50'
                      }`}
                    >
                      {todosByStatus[status].map((todo, index) => (
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
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                  <span className="capitalize">{todo.priority} priority</span>
                                  {todo.dueDate && (
                                    <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                                  )}
                                </div>

                                {/* Task Actions */}
                                <div className="flex items-center justify-between pt-2">
                                  <button
                                    onClick={() => setEditingTodo(todo)}
                                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                                  >
                                    Edit ✏️
                                  </button>
                                  <button
                                    onClick={() => deleteTodo(todo._id)}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                  >
                                    Delete 🗑️
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {/* Empty State */}
                      {todosByStatus[status].length === 0 && (
                        <div className="text-center py-8 text-slate-400">
                          <div className="text-4xl mb-2">📋</div>
                          <p>Drop tasks here</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>

        {/* Edit Todo Modal */}
        {editingTodo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-6">Edit Task</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateTodo(editingTodo._id, {
                    text: editingTodo.text,
                    description: editingTodo.description,
                    priority: editingTodo.priority,
                    dueDate: editingTodo.dueDate,
                  });
                  setEditingTodo(null);
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={editingTodo.text}
                  onChange={(e) => setEditingTodo({...editingTodo, text: e.target.value})}
                  placeholder="Task title"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                  required
                />
                <textarea
                  value={editingTodo.description || ''}
                  onChange={(e) => setEditingTodo({...editingTodo, description: e.target.value})}
                  placeholder="Description (optional)"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500 h-24"
                />
                <select
                  value={editingTodo.priority}
                  onChange={(e) => setEditingTodo({...editingTodo, priority: e.target.value as 'low' | 'medium' | 'high'})}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  value={editingTodo.dueDate || ''}
                  onChange={(e) => setEditingTodo({...editingTodo, dueDate: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Update Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTodo(null)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">{todos.length}</div>
                <div className="text-slate-600">Total Tasks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-600">{todosByStatus.todo.length}</div>
                <div className="text-slate-600">To Do</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{todosByStatus['in-progress'].length}</div>
                <div className="text-slate-600">In Progress</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">{todosByStatus.done.length}</div>
                <div className="text-slate-600">Done</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;