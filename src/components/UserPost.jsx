import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import PostList from "./PostList";
import { fetchAllPosts } from "../api/api";


const UserPost = () => {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('token');

    // Define state variables for posts and username
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');

    // useEffect hook to decode and set the username from the token
    useEffect(() => {
        if (token) {
            try {
                // Decode the JWT token to extract user information
                const decodedToken = jwt_decode(token);
                setUsername(decodedToken.username);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [token]);

    // useEffect hook to fetch and update the list of posts when the component mounts
    useEffect(() => {
        fetchAllPosts()
            .then((fetchedPosts) => {
                setPosts(fetchedPosts);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    const navigate = useNavigate();

    // Function to navigate to the "Add New Post" page
    const navigateAddNewPost = () => {
        navigate('/NewPost');
    };

    return (
        <div className="panel">
            <h1>Welcome {username}!</h1>
            <button onClick={navigateAddNewPost} className="functionalButton">Add New Post</button>
            <PostList posts={posts} />
        </div>
    );
};

export default UserPost;
