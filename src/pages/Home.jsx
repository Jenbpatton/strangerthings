import Greeting from "../components/Greeting";
import { useOutletContext } from "react-router-dom";
import GuestGreeting from '../components/GuessGreeting';

const Home = () => {
    const [isLoggedIn] = useOutletContext();
    return isLoggedIn ? <Greeting /> : <GuestGreeting />;
};

export default Home;