import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import UpdateUser from "./components/Updateuser";
import Users from "./pages/Users";
import AddUserPage from "./pages/AddUserPage";
import Tasks from "./pages/Tasks";
import AddTaskPage from "./pages/AddTaskPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserTasksPage from "./pages/UserTasksPage";
import AssignTaskPage from "./pages/AssignTaskPage";
import FreeUserPage from "./pages/FreeUserPage";
import HomePage from "./pages/HomePage";
import ReopenTaskPage from "./pages/ReopenTaskPage";
import UpadteTasksPage from "./pages/UpdateTaskPage";
import ManagerViewTaskPage from "./pages/ManagerViewTaskPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Welcome Page */}
        <Route path="/" element={<HomePage />} />

        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/update-user/:id" element={<UpdateUser />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/add-task" element={<AddTaskPage />} />
          <Route path="/yourtasks/:userId" element={<UserTasksPage />} />
          <Route path="/reopentasks/:taskId" element={<ReopenTaskPage/>}/>{/*pathvar*/}
          <Route path="/assign-task" element={<AssignTaskPage/>} /> {/*queryparam*/}
          <Route path="/free-users" element={<FreeUserPage />} />
          <Route path="/updatetask/:taskId" element={<UpadteTasksPage/>} />
          <Route path="/viewtask" element={<ManagerViewTaskPage/>} />
          <Route path="/change-password" element={<ChangePasswordPage/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;