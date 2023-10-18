import React, { useState, useEffect } from 'react';
import { userMessages } from '../../api/api';

const Profile = () => {
    const token = localStorage.getItem('token');

    // Initialize state for messages to the user and messages from the user
    const [messageToUser, setMessageToUser] = useState([]);
    const [messageFromUser, setMessageFromUser] = useState([]);

    // Fetch user messages when the component mounts
    useEffect(() => {
        // Use Promise.all to fetch messages asynchronously
        Promise.all([userMessages(token)])
            .then(([data]) => {
                // Extract and set messages from the user
                setMessageFromUser(data.messages);

                // Initialize an array to accumulate messages to the user
                let initial = [];

                // Iterate over user posts to gather messages to the user
                const getMessagesToUser = data.posts.reduce(
                    (accumulator, currentPost) => {
                        // Map and transform messages to include post titles
                        const currentMessages = currentPost.messages.map((message) => ({
                            ...message,
                            title: currentPost.title,
                        }));

                        // Concatenate current messages to the accumulator
                        return accumulator.concat(currentMessages);
                    },
                    initial
                );

                setMessageToUser(getMessagesToUser);
            });
    }, [token]);

    return (
        <div className="panel">
            <h3>Messages to me:</h3>
            {messageToUser?.map(({ _id, title, fromUser: { username }, content }) => (
                <div key={_id} className="posts">
                    <h2>From: {username}</h2>
                    <h4>Message: {content}</h4>
                    <h4>From post: {title}</h4>
                </div>
            ))}
            <h3>Messages from me:</h3>
            {messageFromUser?.map(({ _id, post: { title }, fromUser: { username }, content }) => (
                <div key={_id} className="posts">
                    <h2>From: {username}</h2>
                    <h4>Message: {content}</h4>
                    <h4>From post: {title}</h4>
                </div>
            ))}
        </div>
    );
};

export default Profile;
