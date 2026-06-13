import { useEffect, useState } from "react";
import { getAllUsers, getTasks } from "../services/api";
import "../Styles/FreeUsers.css";
function FreeUsers() {

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  //filter
  const [selectedManager, setSelectedManager] = useState("ALL");

  useEffect(() => {
    getAllUsers().then(data => setUsers(data));
    getTasks().then(data => setTasks(data));
  }, []);

  //  users without tasks
const freeUsers = users.filter(user =>
  user.role === "USER" &&
  !tasks.some(task => task.user?.id === user.id) &&
  (selectedManager === "ALL" ||
    user.manager?.id === parseInt(selectedManager))
);
  //filter by manager 
  const managers = [
  ...new Map(
    users
      .filter(user => user.manager)
      .map(user => [user.manager.id, user.manager])
  ).values()
];

  return (
    
    <div className="free-users-container">
      <div style={{ marginBottom: "10px" }}>
  <label>Filter by Manager: </label>
  <select
    value={selectedManager}
    onChange={(e) => setSelectedManager(e.target.value)}
  >
    <option value="ALL">All</option>

    {managers.map(manager => (
      <option key={manager.id} value={manager.id}>
        {manager.name}
      </option>
    ))}
  </select>
</div>

      <h3>Users Without Tasks ({freeUsers.length})</h3>

      {freeUsers.length === 0 ? (
        <p>All users are assigned tasks ✅</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Manager</th>
            </tr>
          </thead>

          <tbody>
            {freeUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.manager?.name || "No Manager"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default FreeUsers;