import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../services/api";
import "../Styles/UpdateUser.css";
function UpdateUser() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {

    getUserById(id).then(data => {
      setUser(data);
    });

  }, [id]);

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const message = await updateUser(id, user);

    alert(message);

    navigate("/users");

  } catch (error) {

    alert(error.message);

  }
};

  return (

    <div className="update-user-container">

      <h2>Update User</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>ID:</label>
          <input value={id} disabled />
        </div>

        <br />

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Update User
        </button>

      </form>

    </div>

  );
}

export default UpdateUser;