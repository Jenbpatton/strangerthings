import './App.css';
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import UserLogin from './components/pages/Login';
import Register from './components/pages/Register';
import PostList from './components/PostList';  // Removed curly braces
import Message from './components/Message';  // Updated component name
import SinglePost from './components/Singlepost';  // Updated component name
import Post from './components/Post';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <Routes>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Profile">Profile</Link></li>
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Register">Register</Link></li>
            <li><Link to="/Messages">Messages</Link></li>
           </ul>
        </nav>
        <h1>Welcome to Stranger Things</h1>
        <Route exact path="/" element= {<Home />} />
        <Route path="/PostList" element={<PostList />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<UserLogin />} />
        <Route path="/NewPost" element={<Post />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/SinglePost" element={<SinglePost />} />
      </div>
    </Routes>
  );
}

export default App;
