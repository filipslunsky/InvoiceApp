import { useNavigate } from "react-router-dom";

const InvoiceItem = ({invoiceId, dueDate, clientName, total, invoiceStatus}) => {
    const navigate = useNavigate();

    const handleDetailClick = () => {
        navigate(`/invoice/${invoiceId}`);
    };

    return (
        <>
            <div className="invoiceItemMainContainer">
                <span className="invoiceItemID">#{invoiceId}</span>
                <span className="invoiceItemDueDate">{dueDate}</span>
                <span className="invoiceItemClientName">{clientName}</span>
                <span className="invoiceItemTotal">£{total}</span>
                <span className={`invoiceItemStatus${invoiceStatus}`}></span>
                <button className="invoiceItemDetailButton">detail</button>
            </div>
        </>
    );
}
 
export default InvoiceItem;