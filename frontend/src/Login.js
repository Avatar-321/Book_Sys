import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './bg1.jpg';

// Data validation function
const validation = (values) => {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!values.email.trim()) {
        errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Invalid email format";
    }

    if (!values.password.trim()) {
        errors.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
        errors.password = "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }

    return errors;
};

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError({});
        
        // Perform data validation
        const errors = validation(values);
        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        axios.post('http://localhost:3001/login', values)
            .then(res => {
                console.log(res.data);
                navigate('/Home');
            })
            .catch(error => {
                setError({ message: error.response.data.message });
            });
    };

    return (
         <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card text-white bg-transparent">
                            <div className="card-body">
                                    <form onSubmit={handleSubmit} style={{ border: '1px solid white', padding: '20px', borderRadius: '10px', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                    <h1 style={{ textAlign: 'center', color: 'white' }}>Login</h1>
                                        <div className="form-group">
                                            <label htmlFor="email" style={{ color: 'white' }}>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name='email'
                                                value={values.email}
                                                onChange={handleInput}
                                                style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color:'white'}}
                                            />
                                            {error.email && <div className='text-danger'>{error.email}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" style={{ color: 'white' }}>Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name='password'
                                                value={values.password}
                                                onChange={handleInput}
                                                style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color:'white'}}
                                            />
                                            {error.password && <div className='text-danger'>{error.password}</div>}
                                        </div>
                                        {error.message && <div className='text-danger'>{error.message}</div>}
                                        <div className='mt-2'>
                                            <button type="submit" className="btn btn-danger d-block mb-2 text-center rounded-0 w-100">Login</button>
                                            <p style={{ color: 'white' }}>Don't have an account? 
                                            <Link to="/signup" className="btn btn-light d-block text-center rounded-0 w-100 text-decoration-none">Create Account</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        
};

export default Login;
