import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginFormStyle.css';
import { validateForm } from "./validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const Navigate = useNavigate();

    const isAuth = localStorage.getItem("isAuth") === "1";
    if (isAuth) {
        Navigate('/');
    }

    
    const [values, setValues] = useState({
        name: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm(values);
        setErrors(formErrors);
       
        if (Object.keys(formErrors).length === 0) {

            axios
            .post('http://localhost:3001/login', {
                username: values.name,
                password: values.password,
            })
            .then((response) => {
                console.log(response);

                setValues({
                    name: (''),
                    password: (''), 
                    
                });
                console.log(response.data);
                alert("Login Successful");
                localStorage.setItem("isAuth", 1);
                console.log('login successful');
            })
            .catch((error) => {
                console.error(error);
                setValues({
                    name:(''),
                    password:(''),
                })
                alert("Invalid Login Credential");

            });
            
            
    }
}


    return (
        <div className='wrapper d-flex align-items-center justify-content-center w-100'>
            <form onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                <div className='container'>
                    <div className="form-group">
                        <label htmlFor="name"><b>Username</b></label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Username"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password"><b>Password</b></label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
