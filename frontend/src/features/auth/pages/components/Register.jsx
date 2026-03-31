import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/auth';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  // 🔥 Loading UI
  if (loading) {
    return (
      <main>
        <div className="loader"></div>
      </main>
    );
  }

  // ✅ MUST RETURN THIS
  return (
    <main>
      <div className="bg-effect"></div>

      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>Username:</label>
            <input 
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="enter the username"
              required
            />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input 
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="enter the email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="enter the password"
              required
            />
          </div>

          {/* 🔥 Button loading */}
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;