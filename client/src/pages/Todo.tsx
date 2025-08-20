import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  // Get username for greeting
  const getUserData = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return null;
  };

  const user = getUserData();
  const username = user?.username || user?.email?.split('@')[0] || 'User';

  // Load todos (placeholder for now)
  useEffect(() => {
    // TODO: Load todos from API
    const sampleTodos: Todo[] = [
      { id: '1', title: 'Welcome to your Todo App!', completed: false, createdAt: new Date().toISOString() },
      { id: '2', title: 'Add your first task', completed: false, createdAt: new Date().toISOString() },
    ];
    setTodos(sampleTodos);
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {username}'s Todo List
          </h1>
          <p className="text-gray-600">Stay organized and get things done! 📝</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Add New Task */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Task</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button 
                onClick={addTodo}
                disabled={!newTodo.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Your Tasks ({todos.filter(t => !t.completed).length} pending)
            </h2>
            
            {todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No tasks yet. Add your first task above!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div 
                    key={todo.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      todo.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                      />
                      <span className={`${
                        todo.completed 
                          ? 'text-gray-500 line-through' 
                          : 'text-gray-800'
                      }`}>
                        {todo.title}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total: {todos.length} tasks</span>
                <span>Completed: {todos.filter(t => t.completed).length}</span>
                <span>Pending: {todos.filter(t => !t.completed).length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;