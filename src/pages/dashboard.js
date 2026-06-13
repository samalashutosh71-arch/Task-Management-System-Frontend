import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTasks, getManagerUsers } from "../services/api";
import "../Styles/Dashboard.css";
function Dashboard() {

  const [userCount, setUserCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);
  const [openTasks, setOpenTasks] = useState(0);
  const [availableTasks, setAvailableTasks] = useState(0);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {

    //manager users count
    getManagerUsers().then(users => {
      setUserCount(users.length);

      // all tasks
      getTasks().then(tasks => {

        //Filter only manager's user tasks
        const managerTasks = tasks.filter(task =>
          users.some(user => user.id === task.user?.id)  //optional chaining userexits return not undefined
        );
        setTaskCount(managerTasks.length);

        //avl task
        const available = tasks.filter(task => !task.user);
setAvailableTasks(available.length);

        // Status counts
        const completed = managerTasks.filter(t => t.status === "COMPLETED");
        const inProgress = managerTasks.filter(t => t.status === "IN_PROGRESS");
        const open = managerTasks.filter(t => t.status === "OPEN");

        setCompletedTasks(completed.length);
        setInProgressTasks(inProgress.length);
        setOpenTasks(open.length);

      });
    });

  }, []);

  return (
    <div className="dashboard-container">

      <h2>Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h3> My Team Summary</h3>

      <h4>Total Users: {userCount}</h4>
      <h4>Total Tasks: {taskCount}</h4>
      <h4>Completed Tasks: {completedTasks}</h4>
      <h4>In Progress Tasks: {inProgressTasks}</h4>
      <h4>Open Tasks: {openTasks}</h4>
      <h4>Available Tasks: {availableTasks}</h4>

      <hr />

      <h3>User Management</h3>

      <Link to="/users">
        <button>View Users</button>
      </Link>

      <Link to="/add-user">
        <button>Add User</button>
      </Link>

      <Link to="/free-users">
        <button>Unassigned Users</button>
      </Link>

      <hr />

      <h3>Task Management</h3>

      <Link to="/tasks">
        <button>View All Tasks</button>
      </Link>

      <Link to="/add-task">
        <button>Add Task</button>
      </Link>

    </div>
  );
}

export default Dashboard;