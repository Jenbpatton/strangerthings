import { Link } from 'react-router-dom';

export default function Navbar() {
return (
    <div>
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Profile">Profile</Link></li>
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Register">Register</Link></li>
            <li><Link to="/Messages">Messages</Link></li>
        </ul>
    </nav>
    </div>
);
}