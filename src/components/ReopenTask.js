import React, { useEffect, useState } from "react";
import { getTasksByTaskId, updateTask } from "../services/api";
import { useParams } from "react-router-dom";
import "../Styles/ReopenTask.css";
//reopen
function ReopenTask() {
  const { taskId } = useParams(); // read from path variable

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (!taskId) return;

    getTasksByTaskId(taskId)
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching task:", err);
        setLoading(false);
      });
  }, [taskId]);

  // handle update
  const handleUpdate = () => {
    if (!deadline) {
      alert("Please select a new deadline before updating the task.");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(deadline);

    if (selectedDate < currentDate) {
      alert("Deadline cannot be before the current date and time.");
      return;
    }
//obj
    const updatedTask = {
      description: task.description, //due to task single
      status: "REOPEN",
      deadline: deadline
    };

    updateTask(taskId, updatedTask)
      .then((data) => {
        alert("Task updated successfully!");
        setTask(data);
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        alert("Failed to update task. Please try again.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <div className="reopen-task-container">
      <h2>Reopen Task</h2>

      <p>
        <strong>Task ID:</strong> {task.id}
      </p>

      <p>
        <strong>Title:</strong> {task.title}
      </p>

      <p>
        <strong>User ID:</strong> {task.user?.id}
      </p>

      <p>
        <strong>User Name:</strong> {task.user?.name}
      </p>

      <p>
        <strong>Description:</strong>{" "}
        <input
          type="text"
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
        />
      </p>

      <p>
        <strong>New Deadline:</strong>{" "}
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <select
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value })
          }
        >
          <option value="REOPEN">REOPEN</option>
        </select>
      </p>

      <button onClick={handleUpdate} style={{ marginTop: "10px" }}>
        Update Task
      </button>
    </div>
  );
}

export default ReopenTask;