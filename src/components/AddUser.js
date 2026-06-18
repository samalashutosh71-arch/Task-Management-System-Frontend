import { useState } from "react";
import { addUser } from "../services/api";
import "../Styles/AddUser.css";
function AddUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

const handleSubmit = async (e) => {
  e.preventDefault();
//obj
const newUser={
  name:name,
  email:email,
  role:role
}

  try {

    await addUser(newUser);

    alert("User added!");

    setName("");
    setEmail("");
    setRole("USER");

  } catch (error) {

    alert(error.message);

  }

};

  return (
      <div className="add-user-container">

      <h3>Add User</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">USER</option>
        </select>

        <br /><br />

        <button type="submit">Add User</button>

      </form>

    </div>
  );
}

export default AddUser;