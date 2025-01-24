import { useNavigate } from "react-router-dom";
import rightArrowIcon from '../../assets/img/icon-arrow-right.svg';

const InvoiceItem = ({invoiceId, dueDate, clientName, total, invoiceStatus}) => {
    const navigate = useNavigate();

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

    const handleDetailClick = () => {
        navigate(`/invoice/${invoiceId}`);
    };

    return (
        <>
            <div className="invoiceItemMainContainer">
                <span className="invoiceItemID">#{invoiceId}</span>
                <span className="invoiceItemDueDate">Due {formatDate(dueDate.split('T')[0])}</span>
                <span className="invoiceItemClientName">{clientName}</span>
                <span className="invoiceItemTotal">£{formatNumber(Number(total))}</span>
                <span className={`invoiceItemStatus${invoiceStatus}`}></span>
                <button className="invoiceItemDetailButton" onClick={handleDetailClick}><img src={rightArrowIcon} alt="right arrow" /></button>
            </div>
        </>
    );
}
 
export default InvoiceItem;