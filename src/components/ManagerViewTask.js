import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/TaskList.css";
//viewtask 
import {
  getUserTasks,
  deleteTask,
  getManagerUsers,
  changeUser
} from "../services/api";

function ManagerViewTask() {

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("userId");

  // load user tasks
  const loadTasks = useCallback(() => {
    getUserTasks(userId).then(data => setTasks(data));
  }, [userId]);

  // load users for assignment
  const loadUsers = useCallback(() => {
    getManagerUsers().then(data => setUsers(data));
  }, []);

  useEffect(() => {
    loadTasks();
    loadUsers();
  }, [loadTasks, loadUsers]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete task?")) {
      await deleteTask(id);
      loadTasks();
    }
  };

const handleAssign = async (taskId, userId, status) => {

  if (!userId) return;

  if (status === "COMPLETED") {
    alert("Cannot change user for a completed task");
    return;
  }

  await changeUser(taskId, userId);

  alert("Task reassigned successfully");

  loadTasks();
};

  const handleReopen = (taskId) => {
    navigate(`/reopentasks/${taskId}`);
  };

  return (
    <div className="tasks-container">

      <h3>Manager User Task Control</h3>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Description</th>
            <th>Assigned User</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>

              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.description}</td>

              <td>
                <select
                  onChange={(e) =>
                    handleAssign(task.id, e.target.value, task.status)
                  }
                  defaultValue=""
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                {task.deadline
                  ? new Date(task.deadline).toLocaleString()
                  : "No deadline"}
              </td>

              <td>
                <button onClick={() => handleDelete(task.id)}>
                  Delete
                </button>

                {task.status === "COMPLETED" && (
                  <button onClick={() => handleReopen(task.id)}>
                    Reopen
                  </button>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ManagerViewTask;