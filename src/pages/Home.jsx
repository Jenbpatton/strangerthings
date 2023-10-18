import Greeting from "../components/Greeting";
import { useOutletContext } from "react-router-dom";
import GuestLogin from '../components/GuestLogin';

const Home = () => {
    const [isLoggedIn] = useOutletContext();
    return isLoggedIn ? <Greeting /> : <GuestLogin />;
};

export default Home;