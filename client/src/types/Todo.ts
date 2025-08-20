export interface TodoItem {
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

export interface NewTodoForm {
  text: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  tags: string[];
}

export interface TodosByStatus {
  todo: TodoItem[];
  'in-progress': TodoItem[];
  done: TodoItem[];
}

export interface StatusConfig {
  title: string;
  color: string;
  borderColor: string;
  count: number;
}

export type TodoStatus = 'todo' | 'in-progress' | 'done';
export type TodoPriority = 'low' | 'medium' | 'high';
