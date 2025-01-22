import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "./state/slice";

const InvoiceList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const statusRef = useRef();

    const invoices = useSelector(state => state.invoices.invoices);

    useEffect(() => {
        dispatch(getInvoices());
    }, []);

    const handleSelect = () => {
        const status = statusRef.current.value;
        console.log(status);
    };

    const handleClickNew = () => {
        navigate('/new');
    };

    return (
        <> 
            <div className="invoiceListMainContainer">
                <div className="invoiceListControlsContainer">
                    <h2 className="invoiceListMainTitle">Invoices</h2>
                    <span className="invoiceListSubtitle">There {invoices.length === 1 ? 'is' : 'are'} {invoices.length} total invoice{invoices.length === 1 ? '' : 's'}.</span>
                    <select
                    name="statusFilter"
                    id="statusFilter"
                    onChange={handleSelect}
                    ref={statusRef}
                    >
                        <option value="">Filter by status</option>
                        <option value="draft">draft</option>
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                    </select>
                    <button className="newInvoiceButton" onClick={handleClickNew}>+</button>
                </div>
            </div>
        </>
    );
}
 
export default InvoiceList;