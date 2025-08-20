// server/src/models/Todo.ts

import mongoose, { Document, Schema } from 'mongoose';

// Definiere ein Interface für das To-Do-Dokument, um die Typisierung zu gewährleisten
export interface ITodo extends Document {
  text: string;
  description?: string;
  completed: boolean;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  tags?: string[];
  user: mongoose.Schema.Types.ObjectId;
}

// Erstelle das Mongoose-Schema für die To-Do-Einträge
const todoSchema = new Schema<ITodo>({
  text: {
    type: String,
    required: [true, 'Ein Text für das To-Do ist erforderlich.'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Wichtiger Verweis auf das 'User'-Modell
    required: true,
  },
}, {
  timestamps: true // Fügt `createdAt` und `updatedAt` hinzu
});

// Erstelle das Mongoose-Modell und exportiere es
export default mongoose.model<ITodo>('Todo', todoSchema);