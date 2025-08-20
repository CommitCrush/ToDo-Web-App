# TaskFlow 📝

A modern, full-stack task management application with Kanban board functionality, built with React, TypeScript, Node.js, and MongoDB.

## ✨ Features

- **Kanban Board** - Drag & drop tasks between Todo, In Progress, and Done columns
- **User Authentication** - Secure login/register with JWT
- **Task Management** - Create, edit, delete, and organize tasks
- **Priority Levels** - Set task priorities (Low, Medium, High) with color coding
- **Due Dates** - Set and track task deadlines
- **Real-time Updates** - Instant UI updates with drag & drop
- **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, @hello-pangea/dnd  
**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose  
**Authentication:** JWT with HTTP-only cookies

## 🎯 How to Use

1. **Register/Login** - Create account or sign in
2. **Quick Add** - Use the top form for simple tasks
3. **Detailed Add** - Click "Detailed Add" for tasks with descriptions, priorities, and due dates
4. **Drag & Drop** - Move tasks between columns to update status:
   - **📋 To Do** - New tasks
   - **🚀 In Progress** - Active tasks
   - **✅ Done** - Completed tasks
5. **Edit Tasks** - Click "Edit" to modify task details

## 🔗 Key API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /todos` - Get user tasks
- `POST /todos` - Create task
- `PUT /todos/:id` - Update task
- `DELETE /todos/:id` - Delete task

## 📋 Required Dependencies

**Frontend:**
- React 19 with TypeScript
- Vite for development
- Tailwind CSS for styling
- @hello-pangea/dnd for drag & drop

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## 🔐 Security Features

- JWT authentication with secure cookies
- Password hashing with bcrypt
- Input validation and error handling
- CORS protection

---

**Happy Task Managing with TaskFlow! 🎉**