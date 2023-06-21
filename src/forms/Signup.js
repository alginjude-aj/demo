import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginFormStyle.css';
import axios from "axios";
import { validateForm } from "./validation";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const Navigate = useNavigate('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
  
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formErrors = validateForm({ name: username, password });
    
        if (Object.keys(formErrors).length === 0) {
        // Send the username and password to the server
        axios
        .post('http://localhost:3001/signup', {
          username,
          password,
        })
        .then((response) => {
            alert('Signup Successful!');
          setUsername('');
          setPassword('');

          Navigate('/login');
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Set the validation errors
      setErrors(formErrors);
    }
  }

  return (
    <div className='wrapper d-flex align-items-center justify-content-center w-100'>
      <form onSubmit={handleSubmit}>
        <h2>Signup Form</h2>
        <div className="container">
          <label><b>Username</b></label>
          <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="container">
          <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <span className="error">{errors.password}</span>}

          <button type='submit'>Signup</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
