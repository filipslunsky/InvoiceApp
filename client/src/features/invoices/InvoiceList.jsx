import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices, toggleNewInvoice } from "./state/slice";
import InvoiceItem from "./InvoiceItem";
import NewInvoice from "./NewInvoice";
import plusIcon from '../../assets/img/icon-plus.svg';
import './invoiceList.css';

const InvoiceList = () => {
    const dispatch = useDispatch();

    const invoices = useSelector(state => state.invoices.invoices);
    const newInvoice = useSelector(state => state.invoices.newInvoice);
    const addInvoiceStatus = useSelector(state => state.invoices.addInvoiceStatus);
    const nightMode = useSelector(state => state.visual.nightMode);

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
            <div className={nightMode ? newInvoice ? "invoiceListMainContainerSuppressed nightMode" : "invoiceListMainContainer nightMode" : newInvoice ? "invoiceListMainContainerSuppressed" : "invoiceListMainContainer"}>
                <div className="invoiceListControlsContainer">
                    <div className="invoiceListControlsLeftContainer">
                        <h2 className="invoiceListMainTitle">Invoices</h2>
                        <span className="invoiceListSubtitle">There {invoices.length === 1 ? 'is' : 'are'} {invoices.length} total invoice{invoices.length === 1 ? '' : 's'}.</span>
                    </div>
                    <div className="invoiceListControlsRightContainer">
                        <select
                        className="invoiceListStatusFilter"
                        name="statusFilter"
                        id="statusFilter"
                        onChange={(e) => {handleSelect(e)}}
                        defaultValue={invoiceStatus}
                        >
                            <option value="">Filter by Status</option>
                            <option value="draft">draft</option>
                            <option value="pending">pending</option>
                            <option value="paid">paid</option>
                        </select>
                        <button className="newInvoiceButton" onClick={handleClickNew}><img className="invoiceListPlusIcon" src={plusIcon} alt="plus icon" /><span className="newInvoice">New Invoice</span><span className="newInvoiceMobile">New</span></button>
                    </div>                
                </div>
                <div className="invoiceItemsContainer">
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