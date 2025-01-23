import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "./state/slice";

const InvoiceList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const invoices = useSelector(state => state.invoices.invoices);

    const [invoiceStatus, setInvoiceStatus] = useState('');
    const [filteredInvoices, setFilteredInvoices] = useState(invoices);

    useEffect(() => {
        dispatch(getInvoices());
    }, []);

    useEffect(() => {
        setFilteredInvoices(invoices.filter(item => item.status.includes(invoiceStatus)));
    }, [invoiceStatus]);

    const handleSelect = (e) => {
        setInvoiceStatus(e.target.value);
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
                    onChange={(e) => {handleSelect(e)}}
                    defaultValue={invoiceStatus}
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