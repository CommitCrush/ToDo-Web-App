# TaskFlow 📝

A modern, full-stack task management application with Kanban board functionality, built with React, TypeScript, Node.js, and MongoDB.

## ✨ Features

- **Kanban Board** - Drag & drop tasks between Todo, In Progress, and Done columns
- **User Authentication** - Secure login/register with JWT
- **Task Management** - Create, edit, delete, and organize tasks
- **Priority Levels** - Set task priorities (Low, Medium, High) with color coding
- **Due Dates** - Set and track task deadlines
- **Detailed Forms** - Quick add or detailed task creation
- **Real-time Updates** - Instant UI updates with drag & drop
- **Task Statistics** - Visual progress tracking
- **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, @hello-pangea/dnd  
**Backend:** Node.js, Express, TypeScript, MongoDB  
**Authentication:** JWT with HTTP-only cookies

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Clone & Install
```bash
git clone <repository-url>
cd ToDo-Web-App-Fullstack

# Backend setup
cd server
npm install

# Frontend setup  
cd ../client
npm install
```

### 2. Environment Configuration

**Server (.env):**
```env
MONGODB_URL=your-mongodb-connection-string
JWT_SECRET=your-secure-jwt-secret
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Client (.env):**
```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ Replace placeholder values with your actual configuration

### 3. Run the Application
```bash
# Start backend (in server directory)
npm run dev

# Start frontend (in client directory)  
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure
```
TaskFlow/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
│   └── package.json
├── server/          # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── models/
│   └── package.json
└── README.md
```

## 🎯 How to Use

1. **Register/Login** - Create account or sign in
2. **Quick Add** - Use the top form for simple tasks
3. **Detailed Add** - Click "Detailed Add" for tasks with descriptions, priorities, and due dates
4. **Drag & Drop** - Move tasks between columns to update status:
   - **📋 To Do** - New tasks
   - **🚀 In Progress** - Active tasks
   - **✅ Done** - Completed tasks
5. **Edit Tasks** - Click "Edit" to modify task details
6. **Track Progress** - View statistics at the bottom

## 🔗 API Endpoints

**Authentication:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

**Tasks:**
- `GET /todos` - Get user tasks
- `POST /todos` - Create task
- `PUT /todos/:id` - Update task
- `DELETE /todos/:id` - Delete task

## 🎨 Features in Detail

### Kanban Columns
- **To Do**: New tasks waiting to be started
- **In Progress**: Currently active tasks
- **Done**: Completed tasks

<!-- ### Priority System
- **🔴 High Priority**: Red border, urgent tasks
- **🟡 Medium Priority**: Yellow border, standard tasks  
- **🟢 Low Priority**: Green border, less urgent tasks -->

### Task Management
- Quick add for simple tasks
- Detailed forms with descriptions, priorities, and due dates
- Real-time drag & drop status updates
- Edit/delete functionality

## 🔐 Security

- JWT authentication with secure cookies
- Password hashing with bcrypt
- Input validation and error handling
- CORS protection

---

**Happy Task Managing with TaskFlow! 🎉**