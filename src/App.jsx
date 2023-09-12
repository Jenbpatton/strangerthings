import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MessageForm from './MessageForm';
import MessageList from './MessageList';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/">
          <h1>Welcome to the Message App</h1>
        </Route>

        <Route path="/messages">
          <h1>Messages</h1>
          <MessageForm addMessage={addMessage} />
          <MessageList messages={messages} />
        </Route>
      </div>
    </Router>
  );
}

export default App;

