import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from './bg1.jpg';

function Home() {
  const [topBooks, setTopBooks] = useState([]);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setTopBooks(response.data);
      } catch (error) {
        console.error('Error fetching top books:', error);
        setError('Failed to fetch top books');
      }
    };

    fetchTopBooks();
  }, []);

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{  padding: '20px', borderRadius: '10px' }}>
      {error && <div className="alert alert-danger">{error}</div>} 
      <div className="row">
        <div className="col">
        <div style={{ textAlign: 'right', backgroundColor: 'red', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
          <Link to="/recommend" style={{ color: 'white', textDecoration: 'none', marginRight: '50px', transition: 'color 0.3s', border: '1px solid transparent', borderRadius: '3px', padding: '5px' }}>
            Recommendations
          </Link>
          <Link to="/feedback" style={{ color: 'white', textDecoration: 'none', marginRight: '50px', transition: 'color 0.3s', border: '1px solid transparent', borderRadius: '3px', padding: '5px' }}>
            About Us
          </Link>
        </div>
        <h1 style={{ textAlign: 'center', color: 'white',marginBottom:'30px' }}>Top 50 Books</h1>
          <div className="row">
            {topBooks.map((topBook, index) => (
            <div key={index} className="col-md-3 mb-4">
            <div className="card border" style={{ backgroundColor: 'white', height: '100%' }}>
              <img src={topBook.image} className="card-img-top" alt="Book cover" style={{ height: '150px', objectFit: 'cover' }} /> {/* Adjusted height */}
              <div className="card-body" style={{ height: '100%' }}>
                <h5 className="card-title">{topBook.book_name}</h5>
                <p className="card-text">Author: {topBook.author}</p>
                <p className="card-text">Votes: {topBook.votes}</p>
                <p className="card-text">Rating: {topBook.rating}</p>
              </div>
            </div>
          </div>
            ))}
          </div>
        </div>
      </div>
    </div>
</div>
  );
}

export default Home;
