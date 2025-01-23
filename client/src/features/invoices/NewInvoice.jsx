import { useDispatch } from "react-redux";
import { toggleNewInvoice } from "./state/slice";

const NewInvoice = () => {
    const dispatch = useDispatch();

    const handleCancelClick = () => {
        dispatch(toggleNewInvoice());
    };

    return (
        <>
            <h2>New Invoice</h2>
            <button onClick={handleCancelClick}>cancel test</button>
        </>
    );
}
 
export default NewInvoice;