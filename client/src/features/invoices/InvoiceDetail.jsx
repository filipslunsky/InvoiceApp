import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices, editInvoice, deleteInvoice, toggleUpdateInvoice } from "./state/slice";
import EditInvoice from "./EditInvoice";

const InvoiceDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const invoices = useSelector(state => state.invoices.invoices);
    const editInvoiceStatus = useSelector(state => state.invoices.editInvoiceStatus);
    const deleteInvoiceStatus = useSelector(state => state.invoices.deleteInvoiceStatus);
    const message = useSelector(state => state.invoices.message);
    const updateInvoice = useSelector(state => state.invoices.updateInvoice);

    const { id } = useParams();

    const [clickDelete, setClickDelete] = useState(false);

    useEffect(() => {
        dispatch(getInvoices());
    }, [deleteInvoiceStatus, editInvoiceStatus]);

    const thisInvoice = invoices.filter(item => item.invoice_id == id)[0];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    const formatNumber = (number) => {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const handleClickBack = () => {
        navigate('/invoices');
    };

    const handleClickEdit = () => {
        dispatch(toggleUpdateInvoice());
    };

    const handleToggleDelete = () => {
        setClickDelete(!clickDelete);
    };
    
    const handleClickDeleteYes = () => {
        dispatch(deleteInvoice(id));
        navigate('/invoices');
    };

    const handleClickPaid = () => {
        const invoiceData = {...thisInvoice, status: 'paid'};
        dispatch(editInvoice(invoiceData));
    };
    
    const handleClickUnpaid = () => {
        const invoiceData = {...thisInvoice, status: 'pending'};
        dispatch(editInvoice(invoiceData));
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
                        <button className="invoiceDetailEditButton" onClick={handleClickEdit}>Edit</button>
                        {
                            clickDelete
                            ?
                            <div className="invoiceDetailDeleteContainer">
                                <span className="invoiceDetailDeleteConfirmQuestion">Are you sure?</span>
                                <button className="invoiceDetailDeleteYesButton" onClick={handleClickDeleteYes}>Yes</button>
                                <button className="invoiceDetailDeleteNoButton" onClick={handleToggleDelete}>No</button>
                            </div>
                            :
                            <button className="invoiceDetailDeleteButton" onClick={handleToggleDelete}>Delete</button>
                        }
                            {
                                thisInvoice.status === 'pending'
                                ?
                                <button className="invoiceDetailMarkButton" onClick={handleClickPaid}>Mark as Paid</button>
                                :
                                <button className="invoiceDetailMarkButton" onClick={handleClickUnpaid}>Mark as Unpaid</button>
                            }
                    </div>
                </div>
                <div className="invoiceDetailInvoiceInfoContainer">
                    <div className="invoiceDetailInfoHeadContainer">
                        <div className="invoiceDetailInfoHeadLeftContainer">
                            <p className="invoiceDetailInvoiceNumber">#{thisInvoice.invoice_id}</p>
                            <p className="invoiceDetailDescription">{thisInvoice.description}</p>
                        </div>
                        <div className="invoiceDetailInfoHeadRightContainer">
                            <p className="invoiceDetailSenderAddressItem">{thisInvoice.sender_street}</p>
                            <p className="invoiceDetailSenderAddressItem">{thisInvoice.sender_city}</p>
                            <p className="invoiceDetailSenderAddressItem">{thisInvoice.sender_postcode}</p>
                            <p className="invoiceDetailSenderAddressItem">{thisInvoice.sender_country}</p>
                        </div>
                    </div>
                    <div className="invoiceDetailInfoDetailsContainer">
                        <div className="invoiceDetailInfoDetailsLeftContainer">
                            <div className="invoiceDetailInvoiceDateContianer">
                                <p className="invoiceDetailInfoDetailsLeftLable">Invoice Date</p>
                                <p className="invoiceDetailInfoDetailsLeftValue">{formatDate(thisInvoice.created_at.split('T')[0])}</p>
                            </div>
                            <div className="invoiceDetailPaymentDueContainer">
                                <p className="invoiceDetailInfoDetailsLeftLable">Payment Due</p>
                                <p className="invoiceDetailInfoDetailsLeftValue">{formatDate(thisInvoice.payment_due.split('T')[0])}</p>
                            </div>
                        </div>
                        <div className="invoiceDetailInfoDetailsCenterContainer">
                            <p className="invoiceDetailClientLable">Bill To</p>
                            <p className="invoiceDetailClientName">{thisInvoice.client_name}</p>
                            <p className="invoiceDetailClientAddressItem">{thisInvoice.client_street}</p>
                            <p className="invoiceDetailClientAddressItem">{thisInvoice.client_city}</p>
                            <p className="invoiceDetailClientAddressItem">{thisInvoice.client_postcode}</p>
                            <p className="invoiceDetailClientAddressItem">{thisInvoice.client_country}</p>
                        </div>
                        <div className="invoiceDetailInfoDetailsRightContainer">
                            <p className="invoiceDetailEmailLable">Send to</p>
                            <p className="invoiceDetailEmailValue">{thisInvoice.client_email}</p>
                        </div>
                    </div>
                    <div className="invoiceDetailItemsContainer">
                        <div className="invoiceDetailTableContainer">
                            <div className="invoiceDetailTableHeader">
                                <p className="invoiceDetailItemNameLable">Item Name</p>
                                <p className="invoiceDetailQuantityLable">QTY</p>
                                <p className="invoiceDetailPriceLable">Price</p>
                                <p className="invoiceDetailTotalLable">Total</p>
                            </div>
                            {
                                thisInvoice.items.map(item => {
                                    return (
                                        <div className="invoiceDetailItemContainer" key={item.item_id}>
                                            <p className="invoiceDetailItemNameValue">{item.name}</p>
                                            <p className="invoiceDetailQuantityValue">{item.quantity}</p>
                                            <p className="invoiceDetailPriceValue">{formatNumber(item.price)}</p>
                                            <p className="invoiceDetailTotalValue">{formatNumber(item.total)}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="invoiceDetailBottomLineContainer">
                            <p className="invoiceDetailBottomLineLable">Amount Due</p>
                            <p className="invoiceDetailBottomLineValue">£ {formatNumber(thisInvoice.total)}</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                updateInvoice
                ?
                <EditInvoice id={thisInvoice.invoice_id} />
                :
                ''
            }
        </>
    );
}
 
export default InvoiceDetail;