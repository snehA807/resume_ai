import React, { useState } from 'react';
import "../../auth.form.scss";
import { Link } from 'react-router';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router';

const Login = () => {
  const {loading, handleLogin}=useAuth()
  const navigate=useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit=(async (e) => { 
    e.preventDefault();
    
     await handleLogin({email, password})
     navigate("/")
  })
  if (loading) {
  return (
    <main>
      <div className="loader"></div>
    </main>
  );
}
  return (
    <main>
       <div className="bg-effect"></div>
      <div className="form-container">
        <h1>Login</h1>


          <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input 
            onChange={(e)=>setEmail(e.target.value)}
              type="email" 
              id="email" 
              name="email"
              autoComplete="off"
              placeholder="enter the email" 
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input 
            onChange={(e)=>setPassword(e.target.value)}
              type="password" 
              id="password" 
              name="password"
              autoComplete="new-password"
              placeholder="enter the password" 
              required 
            />
          </div>

          <button type="submit">Login</button>  

        </form>
        <p>Dont have an account? <Link to="/register">Register here</Link></p>
      </div>
    </main>
  );
};

export default Login;