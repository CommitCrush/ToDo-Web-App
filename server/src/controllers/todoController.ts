// server/src/controllers/todoController.ts

import type { Request, Response } from 'express';
import Todo from '../models/todo';
import { Types } from 'mongoose';

// 1. Hole alle To-Dos für den authentifizierten Benutzer
export const getTodos = async (req: Request, res: Response) => {
    try {
        // req.user?.id kommt von der `protect` Middleware
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Nicht autorisiert' });
        }
        
        // Finde alle To-Dos, die dem Benutzer zugeordnet sind
        const todos = await Todo.find({ user: userId });
        res.status(200).json(todos);
    } catch (error) {
        // Bei einem Fehler einen Serverfehler-Status zurückgeben
        res.status(500).json({ message: 'Serverfehler' });
    }
};

// 2. Füge ein neues To-Do hinzu
export const addTodo = async (req: Request, res: Response) => {
    const { text } = req.body;
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Nicht autorisiert' });
        }
        
        // Erstelle ein neues To-Do mit dem Text aus dem Request-Body
        // und verknüpfe es mit dem angemeldeten Benutzer
        const newTodo = new Todo({
            text,
            user: userId
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Serverfehler' });
    }
};

// 3. Aktualisiere ein bestehendes To-Do
export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: 'Nicht autorisiert' });

        // Finde das To-Do anhand der ID und des Benutzers, um sicherzustellen,
        // dass nur der Besitzer es bearbeiten kann
        const todo = await Todo.findOneAndUpdate(
            { _id: id, user: userId },
            { completed },
            { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({ message: 'To-Do nicht gefunden oder nicht berechtigt' });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Serverfehler' });
    }
};

// 4. Lösche ein To-Do
export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: 'Nicht autorisiert' });

        // Finde das To-Do und lösche es, aber nur wenn es dem angemeldeten Benutzer gehört
        const todo = await Todo.findOneAndDelete({ _id: id, user: userId });

        if (!todo) {
            return res.status(404).json({ message: 'To-Do nicht gefunden oder nicht berechtigt' });
        }

        res.status(200).json({ message: 'To-Do gelöscht' });
    } catch (error) {
        res.status(500).json({ message: 'Serverfehler' });
    }
};

// 5. Umschalten des 'completed'-Status eines To-Dos
export const toggleTodoCompletion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userId = req.user?.id;
       if (!userId) return res.status(401).json({ message: 'Nicht autorisiert' });

        // Finde das To-Do und toggel den Status
        const todo = await Todo.findOne({ _id: id, user: userId });
        
        if (!todo) {
            return res.status(404).json({ message: 'To-Do nicht gefunden oder nicht berechtigt' });
        }

        todo.completed = !todo.completed;
        await todo.save();

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Serverfehler' });
    }
};