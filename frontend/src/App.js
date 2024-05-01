import React from 'react';
import Login from './Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup';
import Home from './Home';
import Recommendations from './recommend';
import Feedback from './feedback';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path="/Home" element={<Home />} />
        <Route path="/recommend" element={<Recommendations />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>      
    </BrowserRouter>
    
  );
}

export default App;
