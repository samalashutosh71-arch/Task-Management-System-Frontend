import { useEffect, useState } from "react";
import { getTasksByTaskId, updateTask } from "../services/api";
import { useParams } from "react-router-dom";

function UpdateTask()
{
    const { taskId } = useParams();
const [task, setTask] = useState({
  title: "",
  description: "",
  deadline: ""
});
    //loadtasks
    useEffect(()=>{
        getTasksByTaskId(taskId).then(data=>{
            setTask(data);
        })
    },[taskId]);
  
    const handleChange = (e) => {

    setTask({
      ...task,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await updateTask(taskId,task);

    alert("task Updated Successfully");


  };

    return (

    <div>

      <h2>Update Task</h2>

      <form onSubmit={handleSubmit}>
    
        <div>
          <label>ID:</label>
          <input value={taskId} disabled />
        </div>

        <br />

        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Email:</label>
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </div>

        <br />
<div>
  <label>Deadline:</label>
  <input
    type="datetime-local"
    name="deadline"
    value={task.deadline || ""}
    onChange={handleChange}
  />
</div>
        <button type="submit">
          Update Task
        </button>

      </form>

    </div>

  );

}
export default UpdateTask;