import React from 'react';
import { useOutletContext } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Greeting = () => {
    const [token] = useOutletContext();

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
            <h2>Hope You are having a nice day, {username}</h2>
        </div>
    );
};

export default Greeting;
