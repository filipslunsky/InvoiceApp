import { editInvoice, toggleUpdateInvoice } from "./state/slice";

const EditInvoice = ({id}) => {

    const handleCancelClick = () => {
        toggleUpdateInvoice()
    };

    return (
        <>
            <h2>Edit invoice ${id}</h2>
            <button onClick={handleCancelClick}>test cancel</button>
        </>
    );
}
 
export default EditInvoice;