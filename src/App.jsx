import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from "./pages/Root";
import Home from './pages/Home';
import PostList from "./pages/PostList";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewClientPost from './components/NewClientPost';
import Message from './components/Message';
import SinglePost from './components/SinglePost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/Home", 
        element: <Home />,
      },
      {
        path: "/PostList", 
        element: <PostList />,
      },
      {
        path: "/posts/:id",
        element: <SinglePost />,
      },
      {
        path: "/Profile", 
        element: <Profile />,
      },
      {
        path: "/Register", 
        element: <Register />,
      },
      {
        path: "/Login", 
        element: <Login />,
      },
      {
        path: "/NewClientPost",
        element: <NewClientPost />,
      },
      {
        path: "/Message", 
        element: <Message />,
      },
      {
        path: "/SinglePost", 
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
