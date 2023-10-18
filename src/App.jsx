import './App.css';
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import UserLogin from './components/pages/Login';
import Register from './components/pages/Register';
import PostList from './components/PostList';  
import Message from './components/Message'; 
import SinglePost from './components/Singlepost';  
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
        <Route path="/Home" element= {<Home />} />
        <Route
  path="/PostList"
  element={
    <PostList
      posts={[
        { _id: '1', title: 'Post 1', content: 'Content of Post 1' },
        { _id: '2', title: 'Post 2', content: 'Content of Post 2' },
    
      ]}
    />
  }
/>
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
