import { useNavigate } from "react-router-dom";

const GuestGreeting = () => {
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate('/login');
    };

    return(
        <div className="panel">
            <h2>Please login or register</h2>
            <button onClick={navigateLogin} className="loginButton">Log In</button>
        </div>
    )
};

export default GuestGreeting;