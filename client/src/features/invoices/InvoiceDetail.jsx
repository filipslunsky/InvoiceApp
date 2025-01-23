import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices } from "./state/slice";

const InvoiceDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const invoices = useSelector(state => state.invoices.invoices);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getInvoices());
    }, []);

    const thisInvoice = invoices.filter(item => item.invoice_id == id)[0];

    const handleClickBack = () => {
        navigate('/invoices');
    };  

    if (!thisInvoice) {
        return (
            <h2 className="mainStatusMessage">Loading...</h2>
        )
    };

    return (
        <>
            <div className="invoiceDetailMainContainer">
                <div className="invoiceDetailBackContainer">
                    <button className="invoiceDetailBackButton" onClick={handleClickBack}>Go back</button>
                </div>
                <div className="invoiceDetailHeaderContainer">
                    <div className="invoiceDetailStatusContainer">
                        <span className="invoiceDetailStatusLable">Status</span>
                        <span className={`invoiceDetailStatusValue${thisInvoice.status}`}>{thisInvoice.status}</span>
                    </div>
                    <div className="invoiceDetailControlsContainer">
                        <button className="invoiceDetailEditButton">Edit</button>
                        <button className="invoiceDetailDeleteButton">Delete</button>
                            {
                                thisInvoice.status === 'pending'
                                ?
                                <button className="invoiceDetailMarkButton">Mark as Paid</button>
                                :
                                <button className="invoiceDetailMarkButton">Mark as Unpaid</button>
                            }
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default InvoiceDetail;