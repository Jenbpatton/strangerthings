import Greeting from "../Greeting";
import { useOutletContext } from "react-router-dom";

const Home = () => {
    const [isLoggedIn] = useOutletContext();
    return isLoggedIn ? <Greeting /> : <GuestWelcome />;
};

export default Home;