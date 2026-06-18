import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTasks, assignTask } from "../services/api";
import "../Styles/AssignTask.css";
function AssignTask() {

  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [deadlines, setDeadlines] = useState({}); 

  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("userId");

 const navigate = useNavigate();
  
  // load only  unassigned tasks
  useEffect(() => {
    getTasks().then(data => {
      const unassigned = data.filter(task => !task.user);
      setTasks(unassigned);
    });
  }, []);

  //Handle checkbox select
  const handleSelect = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId) //unchecked time
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Handle deadline change
  const handleDeadlineChange = (taskId, value) => {
    setDeadlines(prev => ({
      ...prev,
      [taskId]: value
    }));
  };

  // assign selected tasks
  const handleAssign = async () => {

    if (selectedTasks.length === 0) {
      alert("Please select at least one task");
      return;
    }

    // deadline mandatory in the time of assign
    for (let taskId of selectedTasks) {
      if (!deadlines[taskId]) {
        alert(`Please set deadline for Task ID: ${taskId}`);
        return;
      }
    }
    for (let taskId of selectedTasks) {

  const selectedDate = new Date(deadlines[taskId]);

  if (selectedDate <= new Date()) {
    alert("Deadline must be after the current date and time");
    return;
  }

}

    try {
      for (let taskId of selectedTasks) {
        await assignTask(taskId, userId, deadlines[taskId]); //  send deadline
      }

      alert("Tasks assigned successfully");

      //  Remove assigned tasks from ui
      setTasks(tasks.filter(task => !selectedTasks.includes(task.id)));
      setSelectedTasks([]);
      setDeadlines({}); // reset deadlines

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    
    <div className="assign-task-container">
      <button onClick={() => navigate("/dashboard")}>
  ⬅ Back to Dashboard
</button>

      {tasks.length === 0 ? (
        <p>No unassigned tasks available</p>
      ) : (
        <>
          <table border="1">
            <thead>
              <tr>
                <th>Select</th>
                <th>Task ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th> {/* deadline*/}
              </tr>
            </thead>

            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleSelect(task.id)}
                    />
                  </td>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>

                  <td>
                    <input
                      type="datetime-local"
                      value={deadlines[task.id] || ""}
                      onChange={(e) =>
                        handleDeadlineChange(task.id, e.target.value)
                      }
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          <br />

          <button onClick={handleAssign}>
            Assign Selected Tasks
          </button>
        </>
      )}

    </div>
  );
}

export default AssignTask;