import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from './bg1.jpg'; 

function Feedback() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/feedback', { name, email, feedback });
            setMessage('Feedback submitted successfully');
            setName('');
            setEmail('');
            setFeedback('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setMessage('Failed to submit feedback');
        }
    };

    return (
        <div style={{ display: 'flex', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div className="container" style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', padding: '20px',  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                <div>
                <h1 className="text-danger">About Us</h1>
                    <p>Welcome to BookFlix! We specialize in book recommendation systems, using advanced algorithms to connect readers with their next favorite reads. Gone are the days of aimless searching – our systems analyze your preferences to provide tailored suggestions based on your unique tastes and interests.</p>
                    <p>Our Feedback System is designed to gather valuable feedback from our users to continuously improve our services. It allows users to provide their name, email, and feedback in a simple and efficient manner.</p>
                    <p>The system is built using modern web technologies, including  Node JS, CSS,  and Bootstrap. It utilizes React.js for dynamic user interfaces and state management.</p>
                    <p>We value the opinions and suggestions of our users and strive to create a user-friendly platform that meets their needs.</p>
                    <p>Our mission is simple: to enhance your reading experience. By considering factors like your previous reads, genre preferences, and browsing habits, we ensure that each recommendation is relevant and captivating. Whether you're a seasoned bookworm or just starting your literary journey, our platform introduces you to new authors and genres, enriching your reading experience.</p>
                    <p>Join us in revolutionizing the way readers discover books. Let BookFlix be your guide to a world of literary exploration. Happy reading!</p>

                    <h2 className="text-danger">System Details</h2>
                    <ul>
                        <li>Frontend Framework: React.js</li>
                        <li>Styling Framework: Bootstrap</li>
                        <li>Backend Technology: Node js, Python</li>
                        <li>Database: PHP MyAdmin</li>
                        
                    </ul>
                </div>
            </div>
            <div className="container" style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', padding: '20px',  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                <h1 className="text-danger">Feedback Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color:'white' , borderRadius:'0px'}} id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color:'white' , borderRadius:'0px'}} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="feedback">Feedback:</label>
                        <textarea className="form-control" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color:'white' , borderRadius:'0px'}} id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-danger mt-2 rounded-0">Submit Feedback</button>
                    
                </form>
                {message && <p className="text-danger">{message}</p>}
            </div>
        </div>
    );
    
    
}

export default Feedback;
