import { useDispatch } from "react-redux";
import { editInvoice, toggleUpdateInvoice } from "./state/slice";

const EditInvoice = ({id}) => {
    const dispatch = useDispatch();

    const handleCancelClick = () => {
        dispatch(toggleUpdateInvoice());
    };

    return (
        <>
            <h2>Edit invoice ${id}</h2>
            <button onClick={handleCancelClick}>test cancel</button>
        </>
    );
}
 
export default EditInvoice;