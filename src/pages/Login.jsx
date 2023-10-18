import React, { useState } from 'react';
import { userLogin } from '../api/api';
import { useOutletContext } from 'react-router-dom';

const UserLogin = () => {
    // Initialize state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    // Get the isLoggedIn state and setIsLoggedIn function from context
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();

    // Function to handle login submission
    async function submitLogin(e) {
        e.preventDefault();
        const user = {
            user: {
                username,
                password,
            },
        };

        // Send the login request using API
        const response = await userLogin(user);

        if (response.error) {
            setPasswordErrorMessage('Username or password incorrect. Please try again');
        } else {
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
        }
    }

    return (
        <div className="panel">
            {isLoggedIn ? (
                <h1>Hello!  Nice to see you again!</h1>
            ) : (
                <>
                    <h1>Login</h1>
                    <form onSubmit={submitLogin}>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordErrorMessage('');
                            }}
                        />
                        {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                        <button type="submit" className="submitButton">
                            Log In
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default UserLogin;
