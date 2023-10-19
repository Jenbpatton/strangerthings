import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { editPost, deletePost } from '../api/api';

const SinglePost = () => {
    // Get post details from location state
    const { state } = useLocation();
    const { _id } = state;
    const [thisPost, setThisPost] = useState({ ...state });
    const { author, description, price, location, willDeliver, title, messages } = thisPost;
    const [isEdited, setIsEdited] = useState(false);
    const token = localStorage.getItem('token');
    const { username } = jwt_decode(token);
    const [postTitle, setPostTitle] = useState(title);
    const [postDescription, setPostDescription] = useState(description);
    const [postPrice, setPostPrice] = useState(price);
    const [postLocation, setPostLocation] = useState(location);
    const [postWillDeliver, setPostWillDeliver] = useState(willDeliver);
    const navigate = useNavigate();

    // Function to handle post edit
    async function edit(e) {
        e.preventDefault();

        const post = {
            post: {
                title: postTitle,
                description: postDescription,
                price: postPrice,
                location: postLocation,
                willDeliver: postWillDeliver,
            },
        };

        // Edit the post using API request
        const response = await editPost(post, _id, token);

        // Update posts in local storage
        const updatedPosts = JSON.parse(localStorage.getItem('posts')).map((p) =>
            p._id === _id ? response : p
        );
        localStorage.setItem('posts', JSON.stringify(updatedPosts));

        // Exit edit mode and set the updated post
        setIsEdited(false);
        setThisPost(response);
    }

    // Function to handle post deletion
    async function deletePostHandler(e) {
        e.preventDefault();
        await deletePost(_id, token);
        navigate('/PostList');
    }

    return (
        <>
            <div key={_id} className="posts">
                <h2>{title}</h2>
                {description ? <h3>Description: {description}</h3> : null}
                {price ? <h4>Price: {price}</h4> : null}
                {author ? <h4>Seller: {author.username}</h4> : null}
                {location ? <h4>Location: {location}</h4> : null}
                {author.username === username ? (
                    <>
                        <button onClick={() => setIsEdited(true)} className="functionalButton">
                            Edit Post
                        </button>
                        <button onClick={deletePostHandler} className="functionalButton">
                            Delete Post
                        </button>
                    </>
                ) : null}
            </div>
            {isEdited ? (
                <form onSubmit={edit} className="panel">
                    <h1>Edit Post</h1>
                    <input
                        type="text"
                        defaultValue={thisPost.title}
                        placeholder="Title"
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        defaultValue={thisPost.description}
                        placeholder="Description"
                        onChange={(e) => setPostDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        defaultValue={thisPost.price}
                        placeholder="Price"
                        onChange={(e) => setPostPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        defaultValue={thisPost.location}
                        placeholder="Location"
                        onChange={(e) => setPostLocation(e.target.value)}
                    />
                    <label>
                        <input
                            type="checkbox"
                            defaultChecked={thisPost.willDeliver}
                            onChange={() => setPostWillDeliver(!thisPost.willDeliver)}
                        />
                        <span>Willing to Deliver?</span>
                    </label>
                    <button type="submit" className="createButton">
                        Edit
                    </button>
                </form>
            ) : null}
            <div>
                {author.username === username
                    ? null
                    : messages?.map(({ _id, content, fromUser }) => (
                          <div key={_id}>
                              <h2>From: {fromUser}</h2>
                              <h4>{content}</h4>
                          </div>
                      ))}
            </div>
        </>
    );
};

export default SinglePost;
