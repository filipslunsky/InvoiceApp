import { useSelector, useDispatch } from "react-redux";
import { toggleNightMode } from "./state/slice";
import { useNavigate } from "react-router-dom";

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
                <h2>Navbar</h2>
                <button className="homeButton" onClick={handleHomeClick}>home</button>
                <button className="toggleNightButton" onClick={handleNightModeClick}>{nightMode ? 'ON' : 'OFF'}</button>
                <div className="userImageDiv">
                    <img src="" alt="user image" />
                </div>
            </div>
        </>
    );
}
 
export default Navbar;