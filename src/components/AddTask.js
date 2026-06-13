import { useState } from "react";
import { addTask } from "../services/api";
import "../Styles/AddTask.css";
function AddTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("OPEN");

  const handleSubmit = async (e) => {

    e.preventDefault();
//obj
    const newTask = {
      title: title,
      description: description,
      status: status
    };

    await addTask(newTask);

    alert("Task added!");
   //clear box
    setTitle("");
    setDescription("");
    setStatus("OPEN");

  };

  return (
   <div className="add-task-container">

      <h3>Add Task</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
        </select>

        <br /><br />

        <button type="submit">Add Task</button>

      </form>

    </div>
  );
}

export default AddTask;