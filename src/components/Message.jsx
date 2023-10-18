import React, { useState } from 'react';
import { sendMessage } from '../api/api';
import { useLocation } from 'react-router-dom';

const PostDetailsAndMessage = () => {
    // Initialize state variables
    const [content, setContent] = useState('');
    const { state } = useLocation();
    const [sentMessage, setSentMessage] = useState(true);
    const { _id, author, description, price, location, willDeliver, title } = state;

    // Function to handle message submission
    async function submitMessage(e) {
        e.preventDefault();

        const message = {
            message: {
                content,
            },
        };

        // Get the posts from local storage and find the selected post
        const posts = JSON.parse(localStorage.getItem('posts'));
        const post = posts.find((post) => post._id === _id);
        const token = localStorage.getItem('token');

        // Send the message using API request
        const response = await sendMessage(message, post._id, token);
        setSentMessage(false);
        return response;
    }

    return (
        <section key={_id}>
            <div className="posts">
                <h2>{title}</h2>
                {description ? <h4>{description}</h4> : null}
                {price ? <h4>Price: {price}</h4> : null}
                {author ? <h4>Seller: {author.username}</h4> : null}
                {location ? <h4>Location: {location}</h4> : null}
                {willDeliver ? <h4>Willing to Deliver? Yes</h4> : <h4>Willing to Deliver? No</h4>}
            </div>
            {sentMessage ? (
                <form onSubmit={submitMessage} className="panel">
                    <h2>Message User about this post</h2>
                    <input
                        type="text"
                        value={content}
                        placeholder="content"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit" className="messageButton">
                        Send Message
                    </button>
                </form>
            ) : (
                <h4 className="sent">Message sent to {author.username}!</h4>
            )}
        </section>
    );
};

export default PostDetailsAndMessage;
