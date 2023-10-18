import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Message from './components/Message'; 
import SinglePost from './components/SinglePost';  
import Root from './pages/Root';
import NewClientPost from './components/NewClientPost';
import Login from './pages/Login';
import PostList from './components/PostList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "PostList",
        element: <PostList />,
      },
      {
        path: "posts/:id",
        element: <SinglePost />,
      },
      {
        path: "Profile",
        element: <Profile />,
      }, {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "NewClientPost",
        element: <NewClientPost />,
      },
      {
        path: "Message",
        element: <Message />,
      },
      {
        path: "SinglePost",
        element: <SinglePost />,
      },
    ],
  },
]);
function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
  </div>
  );
}

export default App;
