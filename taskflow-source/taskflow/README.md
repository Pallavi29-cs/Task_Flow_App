# TaskFlow — Task Management Application

A React-based Task Management Application built as per assignment requirements.

## 🚀 Features

### Required
- ✅ Login with Name, Email, Password + full validation
- ✅ Context API for global user state (name shown dynamically in navbar & welcome)
- ✅ Fetch tasks from `https://jsonplaceholder.typicode.com/todos` with 0.5s loader
- ✅ API response transformed: `title → task`, `completed → status`
- ✅ Add Task (prepended to top, unique ID auto-generated)
- ✅ Edit Task (inline edit mode per design)
- ✅ Delete Task (instant UI removal)
- ✅ Update task status dynamically
- ✅ Assign tasks to users
- ✅ Navbar (Home, Add Task, Logout) — stays visible after login
- ✅ Footer (app name + current year)
- ✅ Routing: `/` → Login, `/home` → Home, `/add-task` → Add Task
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Loading state with spinner
- ✅ Error handling for API failures

### Optional (Bonus)
- ✅ Search tasks by name or assigned user
- ✅ Filter by status: All / In Progress / Completed / Hold
- ✅ Pagination (9 tasks per page)
- ✅ Responsive design with media queries

## 📁 Folder Structure

```
src/
  components/
    Navbar.jsx / Navbar.css        — Top navigation
    Footer.jsx / Footer.css        — Bottom footer
    TaskCard.jsx / TaskCard.css    — Single task card (view + edit)
    StatsBar.jsx / StatsBar.css    — Stats counters
  context/
    AuthContext.jsx                — User login state (Context API)
    TaskContext.jsx                — Task list state (Context API)
  hooks/
    useFetchTasks.js               — Custom hook: fetch + loading/error
  pages/
    LoginPage.jsx / LoginPage.css  — Login form
    HomePage.jsx / HomePage.css    — Dashboard with task grid
    AddTaskPage.jsx / AddTaskPage.css — Add task form
  routes/
    ProtectedRoute.jsx             — Guards logged-in routes
  services/
    taskService.js                 — API fetch + transform logic
  utils/
    validation.js                  — Form validation functions
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- npm v9+

### Install & Run

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd taskflow

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🔐 Login Instructions

Any values work — just match the validation rules:
- **Name**: at least 2 characters
- **Email**: valid format (e.g. `test@example.com`)
- **Password**: min 6 chars, 1 uppercase letter, 1 number (e.g. `Test123`)

## 🛠 Tech Stack

- **React 18** — UI library
- **React Router DOM v6** — Client-side routing
- **Context API** — Global state (no Redux needed)
- **Vite** — Build tool
- **CSS Modules (plain CSS)** — Styling with CSS variables
- **JSONPlaceholder API** — Mock task data

## 👤 Author

Deepak Kumar
