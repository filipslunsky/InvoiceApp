import { useSelector, useDispatch } from "react-redux";
import { toggleNightMode } from "./state/slice";

const Navbar = () => {
    const dispatch = useDispatch();
    
    const nightMode = useSelector(state => state.visual.nightMode);

    return (
        <>
            <h2>Navbar</h2>
        </>
    );
}
 
export default Navbar;