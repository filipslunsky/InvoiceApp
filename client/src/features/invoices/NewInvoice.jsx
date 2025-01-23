import { useSelector, useDispatch } from "react-redux";
import { toggleNewInvoice } from "./state/slice";

const NewInvoice = () => {
    const dispatch = useDispatch();

    const newInvoice = useSelector(state => state.invoices.newInvoice);

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