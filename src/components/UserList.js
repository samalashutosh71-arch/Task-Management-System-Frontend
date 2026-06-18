import { useCallback, useEffect, useState } from "react";
import { deleteUser, getManagerUserPagination, getTasks, searchUsers } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../Styles/UserList.css";
//manager users viewUser
function UserList() {

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  // Load users initially (manager users)
  const loadUsers = useCallback(() => {
  getManagerUserPagination(page, 5).then(data => {
    setUsers(data.content);
    setTotalPages(data.totalPages);
  });
}, [page]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);


  // Load tasks
  useEffect(() => {
    getTasks().then(data => setTasks(data));
  }, []);

  // Search handler
  const handleSearch = async () => {
    if (keyword.trim() === "") {
      loadUsers(); // all user
      return;
    }

    const data = await searchUsers(keyword);//api
    setUsers(data);
  };
//delete user
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    const msg = await deleteUser(id);

    alert(msg);

    loadUsers(); // refresh table
  } catch (err) {
    alert(err.message);
  }
};
  // search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Task count
  const getTaskCount = (userId) => {
    return tasks.filter(task => task.user?.id === userId).length;  
  };

  return (
    <div className="users-container">
      <h3>My Users</h3>

      {/* search bar */}
      <div className="users-search">
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button onClick={handleSearch}>
          Search
        </button>

        <button onClick={loadUsers}>
          Reset
        </button>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6">No Users Found</td>
            </tr>
          ) : (
            users.map(user => {
              const taskCount = getTaskCount(user.id);

              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    {taskCount} Task{taskCount !== 1 ? "s" : ""}  
                  </td>

<td>
  <button
    style={{ marginRight: "5px" }}
    onClick={() => navigate(`/assign-task?userId=${user.id}`)}
  >
    Assign Task
  </button>

  {taskCount > 0 && (
    <button
      style={{ marginRight: "5px" }}
      onClick={() => navigate(`/viewtask?userId=${user.id}`)}
    >
      View Tasks
    </button>
  )}

  <button
    onClick={() => navigate(`/update-user/${user.id}`)}
  >
    Update User
  </button>
    <button
    onClick={() => handleDelete(user.id)}
  >
    Delete User
  </button>
</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
  <button
    disabled={page === 0}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </button>

  <span>
    Page {page + 1} of {totalPages}
  </span>

  <button
    disabled={page + 1 >= totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>
    </div>
  );
}

export default UserList;