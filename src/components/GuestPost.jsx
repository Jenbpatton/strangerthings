import React, { useState, useEffect } from 'react';
import { fetchAllPosts } from "../api/api";
import GuestPostList from './GuestPostList';

const GuestPost = () => {
    const [posts, setPosts] = useState([]);

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

    return (
        <div className="container">
            <h1>Welcome Guest!</h1>
            <GuestPostList posts={posts} />
        </div>
    );
};

export default GuestPost;
