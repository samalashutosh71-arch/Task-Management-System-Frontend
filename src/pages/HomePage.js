import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../Styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="home-container">

      {/* nav */}
      <nav className="navbar">
        <div className="logo">Software Pvt. Ltd.</div>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </nav>

      {/*  */}
      <section className="hero">
        <h1 className="fade-in">Task Management System</h1>
        <p className="fade-in">
          Streamline workflows, manage tasks efficiently, and improve team productivity.
        </p>
        <button className="fade-in" onClick={() => navigate("/login")}>
          Login to Continue
        </button>
      </section>

      {/* Features */}
      <section className="features">
        <h2 className="fade-in">Core Features</h2>

        <div className="feature-grid">
          <div className="card fade-in">
            <h3>Task Tracking</h3>
            <p>Real-time monitoring of all assigned tasks.</p>
          </div>

          <div className="card fade-in">
            <h3>Priority Control</h3>
            <p>Manage high and low priority work efficiently.</p>
          </div>

          <div className="card fade-in">
            <h3>Role-Based Access</h3>
            <p>Secure system with manager and employee roles.</p>
          </div>

          <div className="card fade-in">
            <h3>Secure Login</h3>
            <p>JWT-based authentication ensures safety.</p>
          </div>
        </div>
      </section>

      {/* about */}
      <section className="about fade-in">
        <h2>About</h2>
        <p>
          This internal system is built for Ashu Software Pvt. Ltd. to enhance
          productivity, improve task tracking, and streamline operations.
        </p>
      </section>

      {/* access */}
      <section className="access fade-in">
        <h2>Access Control</h2>
        <p>
          Only authorized employees can access the system. Managers onboard users
          and provide credentials.
        </p>
      </section>

      {/* footer*/}
      <footer className="footer">
        <p>© 2026 Ashu Software Pvt. Ltd. | Internal System</p>
      </footer>

    </div>
  );
}

export default HomePage;