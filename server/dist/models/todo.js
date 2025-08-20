// server/src/models/Todo.ts
import mongoose, { Schema } from 'mongoose';
// Erstelle das Mongoose-Schema für die To-Do-Einträge
const todoSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Ein Text für das To-Do ist erforderlich.'],
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Wichtiger Verweis auf das 'User'-Modell
        required: true,
    },
}, {
    timestamps: true // Fügt `createdAt` und `updatedAt` hinzu
});
// Erstelle das Mongoose-Modell und exportiere es
export default mongoose.model('Todo', todoSchema);
