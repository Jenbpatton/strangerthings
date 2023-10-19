import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { fetchAllPosts } from "../api/api";

export default function Root() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    function logout() {
        localStorage.removeItem('token');
        setToken('');
        setIsLoggedIn(false);
    }

    useEffect(() => {
        if (!localStorage.getItem('posts')) {
            fetchAllPosts()
                .then(posts => {
                    localStorage.setItem('posts', JSON.stringify(posts));
                });
        }
    }, []);

    return (
        <div>
            <header>
                <h2 className="webName">Stranger Things</h2>
                <nav className="headerLink">
                    <Link to="home" className="linkStyle">Home</Link>
                    <Link to="postlist" className="linkStyle">Posts</Link>
                    {token ? <Link to="profile" className="linkStyle">Profile</Link> : null}
                    {!token && (
                        <>
                            <Link to="register" className="linkStyle">Register</Link>
                            <Link to="login" className="linkStyle">Login</Link>
                        </>
                    )}
                    {token && <button onClick={logout} className="logoutButton">Log Out</button>}
                </nav>
            </header>
            <main>
                <Outlet
                    context={[
                        token, setToken,
                        isLoggedIn, setIsLoggedIn
                    ]}
                />
            </main>
        </div>
    );
}