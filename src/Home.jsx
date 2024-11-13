import { isAdmin } from "./authService";
import HomeLogin from "./HomeLogin";
import HomeLogout from "./HomeLogout";

const Home = () => {
    return (
        <>
            {isAdmin() ? <HomeLogout /> : <HomeLogin />}
        </>
    )
}

export default Home;