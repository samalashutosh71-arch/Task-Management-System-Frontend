import { useEffect, useState, useCallback } from "react";
import {
  getTasks,
  getTaskByPagination,
  getTaskByStatus
} from "../services/api";
import "../Styles/TaskList.css";

function TaskList() {

  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Pagination load
  const loadTasks = useCallback(() => {
    getTaskByPagination(page, size)
      .then(data => {
        setTasks(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(err => {
        console.error("Error loading tasks:", err);
      });
  }, [page, size]);

  
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // load all task once for filtering
  useEffect(() => {
    getTasks()
      .then(data => {
        setAllTasks(data);
      })
      .catch(err => {
        console.error("Error loading all tasks:", err);
      });
  }, []);

  const handleFilter = async (status) => {
    setStatusFilter(status);

    if (status === "ALL") {
      loadTasks();
      return;
    }

    if (status === "UNASSIGNED") {
      const unassignedTasks = allTasks.filter(
        task => task.user == null
      );

      setTasks(unassignedTasks);
      return;
    }

    try {
      const data = await getTaskByStatus(status);
      setTasks(data);
    } catch (err) {
      console.error("Error filtering tasks:", err);
    }
  };

  return (
    <div className="tasks-container">

      <h3>All Tasks (Read Only)</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>Filter Tasks: </label>

        <select
          value={statusFilter}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="UNASSIGNED">UNASSIGNED</option>
          <option value="REOPEN">REOPEN</option>
        </select>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned User</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                {task.user
                  ? task.user.name
                  : "Unassigned"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {statusFilter === "ALL" && (
        <div style={{ marginTop: "10px" }}>
          <button
            disabled={page === 0}
            onClick={() => setPage(prev => prev - 1)}
          >
            Previous
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}

export default TaskList;