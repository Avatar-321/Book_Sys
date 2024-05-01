import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from './bg1.jpg'; 
import { Link } from 'react-router-dom';

function Recommendations() {
  const [userInput, setUserInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/recommend', {
        user_input: userInput
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Failed to fetch recommendations');
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'left', padding: '20px' }}>
    <div style={{ textAlign: 'center', padding: '10px', position: 'absolute', top: '20px', right: '20px', backgroundColor: 'rgba(255, 0, 0, 0.7)',  width:'150px'}}>
     <Link to="/feedback" style={{ color: 'white', textDecoration: 'none'}}>About Us</Link>
    </div>
    {error && <div className="alert alert-danger">{error}</div>} 
    <div className="row mt-4">
      <div className="col">
        <h1 style={{ color: 'white' }}>Book Recommendation System</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_input" style={{ color: 'white',  }}>Enter a book title:</label>
            <input
              type="text"
              id="user_input"
              name="user_input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="form-control"
              style={{borderRadius:'0px',backgroundColor: 'rgba(0, 0, 0, 0.7)', color:'white'}}
            />
          </div>
          <button type="submit" className="btn btn-danger rounded-0 mt-3">Recommend </button>
        </form>
  
        <h2 className="mt-4" style={{ color: 'white' }}>Recommendations:</h2>
        <div className="row">
          {recommendations.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card" style={{ height: '100%',  }}>
                <img src={item.image_url} className="card-img-top" alt="Book cover" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Author: {item.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Recommendations;
