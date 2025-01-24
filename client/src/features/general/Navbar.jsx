import { useSelector, useDispatch } from "react-redux";
import { toggleNightMode } from "./state/slice";
import { useNavigate } from "react-router-dom";
import moonIcon from '../../assets/img/icon-moon.svg';
import sunIcon from '../../assets/img/icon-sun.svg';
import avatarImage from '../../assets/img/image-avatar.jpg';
import appLogo from '../../assets/img/logo.svg';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const nightMode = useSelector(state => state.visual.nightMode);

    const handleNightModeClick = () => {
        dispatch(toggleNightMode());
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <>  <div className="navbarMainContainer">
                <button className="homeButton" onClick={handleHomeClick}><img src={appLogo} alt="logo" /></button>
                <button className="toggleNightButton" onClick={handleNightModeClick}><img src={nightMode ? sunIcon : moonIcon} /></button>
                <div className="userImageDiv">
                    <img src={avatarImage} alt="user image" />
                </div>
            </div>
        </>
    );
}
 
export default Navbar;