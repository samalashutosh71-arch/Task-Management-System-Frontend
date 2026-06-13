import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/api";

function ChangePassword() {

  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password must match");
      return;
    }

    try {

      const message = await changePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );

      alert(message);

      navigate(-1);

    } catch (error) {

      // Backend validation messages will show here
      alert(error.message);

    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px"
    }}>

      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            marginRight: "10px"
          }}
        >
          Change Password
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

      </form>

    </div>
  );
}

export default ChangePassword;