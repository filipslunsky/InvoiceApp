import { useNavigate } from "react-router-dom";
import rightArrowIcon from '../../assets/img/icon-arrow-right.svg';
import './invoiceItem.css';

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

    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    return (
        <>
            <div className="invoiceItemMainContainer">
                <div className="invoiceItemId"><span className="invoiceItemHashtag">#</span>{invoiceId}</div>
                <div className="invoiceItemDueDate">Due {formatDate(dueDate.split('T')[0])}</div>
                <div className="invoiceItemClientName">{clientName}</div>
                <div className="invoiceItemTotal">£ {formatNumber(Number(total))}</div>
                <div className={`invoiceItemStatus${capitalizeFirstLetter(invoiceStatus)}`}>{capitalizeFirstLetter(invoiceStatus)}</div>
                <button className="invoiceItemDetailButton" onClick={handleDetailClick}><img src={rightArrowIcon} alt="right arrow" /></button>
            </div>
            <div className="invoiceItemMainContainerMobile" onClick={handleDetailClick}>
                <div className="invoiceItemLeftContainer">
                    <div className="invoiceItemId"><span className="invoiceItemHashtag">#</span>{invoiceId}</div>
                    <div className="invoiceItemDueDate">Due {formatDate(dueDate.split('T')[0])}</div>
                    <div className="invoiceItemTotal">£ {formatNumber(Number(total))}</div>
                </div>
                <div className="invoiceItemRightContainer">
                    <div className="invoiceItemClientName">{clientName}</div>
                    <div className={`invoiceItemStatus${capitalizeFirstLetter(invoiceStatus)}`}>{capitalizeFirstLetter(invoiceStatus)}</div>
                </div>
            </div>
        </>
    );
}
 
export default InvoiceItem;