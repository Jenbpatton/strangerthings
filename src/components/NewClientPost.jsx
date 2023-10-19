import React, { useState } from 'react';
import { addNewPost } from '../api/api';
import { useNavigate } from 'react-router-dom';

const NewClientPost = () => {
    // Initialize state variables
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [postErrorMessage, setPostErrorMessage] = useState('');
    
   
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

   
    async function submitPost(e) {
        e.preventDefault();

        // Create a post object
        const post = {
            post: {
                title,
                description,
                price,
                location,
            },
        };

        // Send the post using API request
        const response = await addNewPost(post, token);

        // Check if required fields are empty and set error message
        if (!title || !description || !price) {
            setPostErrorMessage('This is a required field');
        } else {
            // Navigate to the PostList page after successful submission
            navigate('/PostList');
        }
    }

    return (
        <form onSubmit={submitPost} className="panel">
            <h1>Add New Post</h1>
            <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            {postErrorMessage ? <p>{postErrorMessage}</p> : null}
            <input
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            {postErrorMessage ? <p>{postErrorMessage}</p> : null}
            <input
                type="text"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
            />
            {postErrorMessage ? <p>{postErrorMessage}</p> : null}
            <input
                type="text"
                value={location}
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit" className="createButton">
                Create
            </button>
        </form>
    );
};

export default NewClientPost;
