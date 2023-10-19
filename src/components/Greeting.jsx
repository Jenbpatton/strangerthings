import React from 'react';
import { useOutletContext } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Greeting = () => {
    // Accessing the user token from context
    const [token] = useOutletContext();

    // Initialize the username
    let username = '';

    try {
        // Decode the token to get the username
        const { username: decodedUsername } = jwt_decode(token);
        username = decodedUsername;
    } catch (error) {
        console.error("Error decoding token:", error);
    }

    return (
        <div className="panel">
            <h1>Welcome to Stranger Things!</h1>
            <h2>Nice to see you again, {username}</h2>
        </div>
    );
};

export default Greeting;
