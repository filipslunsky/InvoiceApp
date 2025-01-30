import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices, toggleNewInvoice, resetAddInvoiceStatus, resetDeleteInvoiceStatus, setStatusMessage } from "./state/slice";
import InvoiceItem from "./InvoiceItem";
import NewInvoice from "./NewInvoice";
import StatusMessage from "./StatusMessage";
import plusIcon from '../../assets/img/icon-plus.svg';
import './invoiceList.css';

const InvoiceList = () => {
    const dispatch = useDispatch();

    const invoices = useSelector(state => state.invoices.invoices);
    const invoicesStatus = useSelector(state => state.invoices.invoicesStatus);
    const newInvoice = useSelector(state => state.invoices.newInvoice);
    const addInvoiceStatus = useSelector(state => state.invoices.addInvoiceStatus);
    const nightMode = useSelector(state => state.visual.nightMode);
    const deleteInvoiceStatus = useSelector(state => state.invoices.deleteInvoiceStatus);
    const statusMessage = useSelector(state => state.invoices.statusMessage);

    const [invoiceStatus, setInvoiceStatus] = useState('');
    const [filteredInvoices, setFilteredInvoices] = useState(invoices);

    useEffect(() => {
        dispatch(getInvoices());
    }, [dispatch, addInvoiceStatus]);

    useEffect(() => {
        setFilteredInvoices(invoices);
    }, [invoices, addInvoiceStatus]);

    useEffect(() => {
        setFilteredInvoices(invoices.filter(item => item.status.includes(invoiceStatus)));
    }, [invoiceStatus]);

     useEffect(()=> {
        if (addInvoiceStatus === 'success') {
                dispatch(setStatusMessage({ text: "Invoice added successfully!", visible: true, style: 'success' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 1500);
                dispatch(resetAddInvoiceStatus());
            } else if (addInvoiceStatus === 'failed') {
                dispatch(setStatusMessage({ text: "Failed to add invoice. Please try again.", visible: true, style: 'failed' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 1500);
                dispatch(resetAddInvoiceStatus());
            }
    }, [addInvoiceStatus]);

    useEffect(()=> {
        if (deleteInvoiceStatus === 'success') {
            dispatch(setStatusMessage({ text: "Invoice deleted successfully!", visible: true, style: 'success' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 1500);
            dispatch(resetDeleteInvoiceStatus());
        } else if (deleteInvoiceStatus === 'failed') {
            dispatch(setStatusMessage({ text: "Failed to delete invoice. Please try again.", visible: true, style: 'failed' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 1500);
            dispatch(resetDeleteInvoiceStatus());
        }
    }, [deleteInvoiceStatus]);

    const handleSelect = (e) => {
        setInvoiceStatus(e.target.value);
    };

    const handleClickNew = () => {
        dispatch(toggleNewInvoice());
    };

    if (invoicesStatus === 'pending') {
        return (
            <h2 className="mainStatusMessage">Loading...</h2>
        )
    };

    if (invoicesStatus === 'failed') {
        return (
            <h2 className="mainStatusMessage">Oooops... Failed to load invoices, please try again later.</h2>
        )
    };

    return (
        <> 
            {statusMessage.visible && <StatusMessage text={statusMessage.text} style={statusMessage.style} />}
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