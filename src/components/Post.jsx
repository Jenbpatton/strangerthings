import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PostList from './PostList';
import { fetchAllPosts } from '../api/api';

const Post = () => {
    // Get user token and initialize state variables
    const token = localStorage.getItem('token');
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');

    // Decode the token to extract the username
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                setUsername(decodedToken.username);
            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle decoding error here
            }
        }
    }, [token]);

    // Fetch posts when the component mounts
    useEffect(() => {
        fetchAllPosts()
            .then((fetchedPosts) => {
                setPosts(fetchedPosts);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                // Handle fetch error here
            });
    }, []);

    // Initialize navigate function
    const navigate = useNavigate();

    // Function to navigate to the NewClientPost page
    const navigateAddNewPost = () => {
        navigate('/NewClientPost');
    };

    return (
        <div className="panel">
            <h1>Welcome {username}!</h1>
            <button onClick={navigateAddNewPost} className="functionalButton">
                Add New Post
            </button>
            <PostList posts={posts} />
        </div>
    );
};

export default Post;
