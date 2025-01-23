import { useParams } from "react-router-dom";

const InvoiceDetail = () => {
    const { id } = useParams();

    return (
        <>
            <h2>Invoice id {id}</h2>
        </>
    );
}
 
export default InvoiceDetail;