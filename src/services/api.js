//const API_BASE = "http://localhost:8080/taskManagementApi/api";//internal

//const API_BASE = "https://task-management-system-1-tndx.onrender.com/taskManagementApi/api";//for backend deploy check
const API_BASE = process.env.REACT_APP_API_BASE;//for full deploy
// helper function to attach JWT token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

//==================login===================
export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Login failed");
  }

  return response.json();
};

// ================= USERS =================

// GET ALL USERS use for assigntask to show all user at a time
export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE}/saves/getAllUser`, {
    headers: getAuthHeader()
  });
  return response.json();
};
// GET USERS WITH PAGINATION
export const getUsers = async (page = 0, size = 5) => {
  const response = await fetch(
    `${API_BASE}/saves/paged?page=${page}&size=${size}`,
    {
      headers: getAuthHeader()
    }
  );

  return response.json();
};

export const addUser = async (user) => {
  const response = await fetch(`${API_BASE}/saves/createUser`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(user)
  });

  const message = await response.text();

  if (!response.ok) {
    throw new Error(message);
  }

  return message;
};

// DELETE USER
export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE}/saves/delete/${id}`, {
    method: "DELETE",
    headers: getAuthHeader()
  });

  const message = await response.text();

  if (!response.ok) {
    throw new Error(message);
  }

  return message;
};

// GET USER BY ID
export const getUserById = async (id) => {
  const response = await fetch(`${API_BASE}/saves/${id}`, {
    headers: getAuthHeader()
  });
  return response.json();
};

// UPDATE USER
export const updateUser = async (id, user) => {
  const response = await fetch(`${API_BASE}/saves/update/${id}`, {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(user)
  });

  const message= await response.text();
    if (!response.ok) {
    throw new Error(message);
  }

  return message;

};
//serach manager specific users
export const searchUsers=async (keyword)=>{
  const response=await fetch(`${API_BASE}/saves/search/users?keyword=${keyword}`,
    {
      method:"GET",
      headers:getAuthHeader(),

    }
  );
  return response.json();
};
//get manager users
export const getManagerUsers = async () => {
  const response = await fetch(
    `${API_BASE}/saves/manager/users`,
    {
      headers: getAuthHeader()
    }
  );

  return response.json();
};
//get pagination of managerspecific user
export const getManagerUserPagination = async (page, size) => {
  const response = await fetch(
    `${API_BASE}/saves/manager/pagination?pageNo=${page}&pageSize=${size}`,
    {
      headers: getAuthHeader()
    }
  );

  return response.json();
};
// ================= TASKS =================

// GET ALL TASKS
export const getTasks = async () => {
  const response = await fetch(`${API_BASE}/tasks/getAllTask`, {
    headers: getAuthHeader()
  });
  return response.json();
};

// CREATE TASK

export const addTask = async (task) => {
  const response = await fetch(`${API_BASE}/tasks/createTask`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(task)
  });

  const message = await response.text();

  if (!response.ok) {
    throw new Error(message);
  }

  return message;
};

// DELETE TASK
export const deleteTask = async (id) => {
  await fetch(`${API_BASE}/tasks/delete/${id}`, {
    method: "DELETE",
    headers: getAuthHeader()
  });
};

// UPDATE TASK
export const updateTask = async (id, task) => {
  const response = await fetch(`${API_BASE}/tasks/update/${id}`, {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(task)
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return response.json(); // returns full Task object
};

// FILTER TASK BY STATUS
export const getTaskByStatus = async (status) => {
  const response = await fetch(`${API_BASE}/tasks/taskStatus/${status}`, {
    headers: getAuthHeader()
  });
  return response.json();
};

// ASSIGN TASK


export const assignTask = async (taskId, userId, deadline) => {
  const response = await fetch(
    `${API_BASE}/tasks/assign/${taskId}/${userId}`,
    {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify({
        deadline: new Date(deadline).toISOString()
      })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to assign task");
  }

  return response.json();
};
//chnage owner of task
export const changeUser = async (taskId, userId) => {

  const response = await fetch(
    `${API_BASE}/tasks/changeUser/${taskId}/${userId}`,
    {
      method: "PUT",
      headers: getAuthHeader()
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

//UserTasks

export const getUserTasks = async (userId) => {
  const response = await fetch(
    `${API_BASE}/tasks/yourtasks/${userId}`,
    {
      headers: getAuthHeader()
    }
  );
  return response.json();
};
// Get tasks by taskId
export const getTasksByTaskId = async (taskId) => {
  const response = await fetch(`${API_BASE}/tasks/gettask/${taskId}`, {
    headers: getAuthHeader()
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

//getAllTaskPageination
export const getTaskByPagination = async (page, size) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE}/tasks/pagetasks?page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Backend response:", errorText);
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};


//pass
export const changePassword = async (
  oldPassword,
  newPassword,
  confirmPassword
) => {

  const response = await fetch(
    `${API_BASE}/saves/change-password`,
    {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify({
        oldPassword,
        newPassword,
        confirmPassword
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.text();
};