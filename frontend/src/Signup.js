import React, { useState } from 'react';
import validation from './Signupval'; 
import backgroundImage from './bg1.jpg'; 


function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({}); // State for errors

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!username || !email || !password) {
        //     Notyf.error("All fields are required");
        //     return;
        // }

        try {
            const response = await fetch("http://localhost:3001/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, role: 'user' }),
            });

            // Handle response as JSON
            const data = await response.json();
            console.log(data);

            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Perform data validation
    //     const values = { username, email, password };
    //     const errors = validation(values);
    //     if (Object.keys(errors).length > 0) {
    //         setError(errors);
    //         return;
    //     }

    //     try {
    //         const response = await fetch("http://localhost:3001/signup", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ username, email, password }),
    //         });

    //         const data = await response.text();
    //         console.log(data);
    //         window.location.href = "/";

    //         // setTimeout(() => {
    //         //     window.location.href = "/";
    //         // }, 3000);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card text-white bg-transparent">
                            <div className="card-body" style={{ border: '1px solid white', padding: '20px', borderRadius: '10px', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                <h1 style={{ textAlign: 'center', color: 'white' }}>Signup</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="form1" style={{ color: 'white' }}>Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="form1"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color:'white'}}
                                        />
                                        {error.username && <div className='text-danger'>{error.username}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="form2" style={{ color: 'white' }}>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="form2"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color:'white'}}
                                        />
                                        {error.email && <div className='text-danger'>{error.email}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="form3" style={{ color: 'white' }}>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="form3"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color:'white'}}
                                        />
                                        {error.password && <div className='text-danger'>{error.password}</div>}
                                    </div>
                                    <div className='mt-2'>
                                        <button type="submit" className="btn btn-danger d-block mb-2 text-center rounded-0 w-100">Signup</button>
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

export default Signup;
