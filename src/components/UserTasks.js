import { useEffect, useState } from "react";
import { getUserTasks, updateTask } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/UserTask.css";

function UserTasks() {

  const { userId } = useParams();

  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getUserTasks(userId);
        setTasks(data);
      } catch (error) {
        console.error("Error loading user tasks:", error);
      }
    };

    loadTasks();
  }, [userId]);

  const toggleStatus = async (task) => {

    let newStatus;

    if (task.status === "OPEN") {
      newStatus = "IN_PROGRESS";
    }
    else if (task.status === "IN_PROGRESS") {
      newStatus = "COMPLETED";
    }
    else if (task.status === "REOPEN") {
      newStatus = "IN_PROGRESS";
    }
    else {
      return;
    }

    const updatedTask = {
      ...task,
      status: newStatus
    };

    try {

      await updateTask(task.id, updatedTask);

      const data = await getUserTasks(userId);
      setTasks(data);

    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const getTaskTimeInfo = (task) => {

    if (!task.deadline) {
      return "No deadline";
    }

    if (task.status === "COMPLETED" && task.completedAt) {

      const deadline = new Date(task.deadline);
      const completed = new Date(task.completedAt);

      const diff = deadline - completed;

      const totalHours = Math.floor(
        Math.abs(diff) / (1000 * 60 * 60)
      );

      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;

      if (diff >= 0) {
        return `✅ Completed ${days}d ${hours}h Before Deadline`;
      }

      return `❌ Completed ${days}d ${hours}h After Deadline`;
    }

    const now = new Date();
    const deadline = new Date(task.deadline);

    const diff = deadline - now;

    const totalHours = Math.floor(
      Math.abs(diff) / (1000 * 60 * 60)
    );

    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    if (diff >= 0) {
      return `⏳ ${days}d ${hours}h left`;
    }

    return `❌ Overdue by ${days}d ${hours}h`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="user-tasks-container">

      <div className="page-header">

        <h2>User Tasks (ID: {userId})</h2>

        <div>

       <button
  style={{
    marginRight: "10px",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white"
  }}
  onClick={() => navigate("/change-password")}
>
  Change Password
</button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

      {tasks.length === 0 ? (

        <div className="empty-state">
          <h3>No tasks found 🎯</h3>
          <p>All caught up! No tasks assigned right now.</p>
        </div>

      ) : (

        <div className="table-wrapper">

          <table className="task-table">

            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Completed At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr key={task.id} className="table-row">

                  <td>{task.title}</td>

                  <td className={`status-${task.status}`}>
                    {task.status}
                  </td>

                  <td>{task.description}</td>

                  <td>

                    {task.deadline ? (
                      <>
                        <div>
                          {new Date(task.deadline).toLocaleString()}
                        </div>

                        <div className="time-info">
                          {getTaskTimeInfo(task)}
                        </div>
                      </>
                    ) : (
                      <span className="no-deadline">
                        No deadline
                      </span>
                    )}

                  </td>

                  <td>
                    {task.completedAt
                      ? new Date(task.completedAt).toLocaleString()
                      : "Not Completed Yet"}
                  </td>

                  <td>

                    {task.status !== "COMPLETED" ? (

                      <button
                        className="action-btn"
                        onClick={() => toggleStatus(task)}
                      >
                        Toggle Status
                      </button>

                    ) : (

                      <span className="completed-badge">
                        Completed ✔
                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default UserTasks;