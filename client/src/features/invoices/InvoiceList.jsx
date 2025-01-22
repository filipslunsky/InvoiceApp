import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices } from "./state/slice";

const InvoiceList = () => {
    const dispatch = useDispatch();

    const invoices = useSelector(state => state.invoices.invoices);

    useEffect(() => {
        dispatch(getInvoices());
    }, []);

    return (
        <>
        
        </>
    );
}
 
export default InvoiceList;