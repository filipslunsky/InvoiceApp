import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices, toggleNewInvoice } from "./state/slice";
import InvoiceItem from "./InvoiceItem";
import NewInvoice from "./NewInvoice";
import plusIcon from '../../assets/img/icon-plus.svg';

const InvoiceList = () => {
    const dispatch = useDispatch();

    const invoices = useSelector(state => state.invoices.invoices);
    const newInvoice = useSelector(state => state.invoices.newInvoice);
    const addInvoiceStatus = useSelector(state => state.invoices.addInvoiceStatus);

    const [invoiceStatus, setInvoiceStatus] = useState('');
    const [filteredInvoices, setFilteredInvoices] = useState(invoices);

    useEffect(() => {
        dispatch(getInvoices());
    }, [dispatch]);

    useEffect(() => {
        setFilteredInvoices(invoices);
    }, [invoices, addInvoiceStatus]);

    useEffect(() => {
        setFilteredInvoices(invoices.filter(item => item.status.includes(invoiceStatus)));
    }, [invoiceStatus]);

    const handleSelect = (e) => {
        setInvoiceStatus(e.target.value);
    };

    const handleClickNew = () => {
        dispatch(toggleNewInvoice());
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
                        <option value="">Filter</option>
                        <option value="draft">draft</option>
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                    </select>
                    <button className="newInvoiceButton" onClick={handleClickNew}><img src={plusIcon} alt="plus icon" />New Invoice</button>
                </div>
                {
                    filteredInvoices.map(item => {
                        return (
                            <InvoiceItem
                            key={item.invoice_id}
                            invoiceId={item.invoice_id}
                            dueDate={item.payment_due}
                            clientName={item.client_name}
                            total={item.total}
                            invoiceStatus={item.status}
                            />
                        )
                    })
                }
            </div>
            {
                newInvoice
                ?
                <NewInvoice />
                :
                ''
            }
        </>
    );
}
 
export default InvoiceList;