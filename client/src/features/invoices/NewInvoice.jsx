import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleNewInvoice, createNewInvoice } from "./state/slice";
import trashIcon from '../../assets/img/icon-delete.svg';
import plusIcon from '../../assets/img/icon-plus.svg';
import './formInvoice.css';

const NewInvoice = () => {
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.visual.nightMode);

    const fromStreetRef = useRef();
    const fromCityRef = useRef();
    const fromPostalRef = useRef();
    const fromCountryRef = useRef();
    const toNameRef = useRef();
    const toEmailRef = useRef();
    const toStreetRef = useRef();
    const toCityRef = useRef();
    const toPostalRef = useRef();
    const toCountryRef = useRef();
    const toDateRef = useRef();
    const toTermsRef = useRef();
    const toDescriptionRef = useRef();
    const toInvoiceNumberRef = useRef();

    const [items, setItems] = useState([{ name: "", quantity: 1, price: 0, total: 0 }]);
    const itemRefs = useRef([]);

    const [missingNumber, setMissingNumber] = useState(false);
    const [missingDate, setMissingDate] = useState(false);

    useEffect(() => {
        itemRefs.current = items.map((_, index) => 
            itemRefs.current[index] || {
                name: React.createRef(),
                quantity: React.createRef(),
                price: React.createRef(),
            }
        );
    }, [items]);

    const addItem = () => {
        setItems([...items, { name: "", quantity: 1, price: 0, total: 0 }]);
    };

    const updateItem = (index, field, value) => {
        const updatedItems = items.map((item, i) =>
            i === index
                ? {
                    ...item,
                    [field]: value,
                    total: field === "quantity" || field === "price"
                        ? (field === "quantity" ? value : item.quantity) * (field === "price" ? value : item.price)
                        : item.total,
                }
                : item
        );
        setItems(updatedItems);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
        itemRefs.current.splice(index, 1);
    };

    const handleCancelClick = () => {
        dispatch(toggleNewInvoice());
    };

    const totalPrice = items.reduce((sum, item) => sum + item.total, 0);

    const calculateDueDate = (issueDate, daysToAdd) => {
        const date = new Date(issueDate);
        date.setDate(date.getDate() + daysToAdd);
        return date.toISOString();
    };

    const handleAddNewInvoice = () => {
        if (toInvoiceNumberRef.current.value === '' || toDateRef.current.value.length === 0) {
            if (toInvoiceNumberRef.current.value === '') {
                setMissingNumber(true);
            } else {
                setMissingNumber(false);
            };
    
            if (toDateRef.current.value.length === 0) {
                setMissingDate(true);
            } else {
                setMissingDate(false);
            };
            return;
        } else {
            setMissingNumber(false);
            setMissingDate(false);
        };

        const dueDate = calculateDueDate(toDateRef.current.value, Number(toTermsRef.current.value));

        const issueDate = new Date(toDateRef.current.value).toISOString();

        const itemData = items.map((_, index) => ({
            name: itemRefs.current[index].name.current.value,
            quantity: parseInt(itemRefs.current[index].quantity.current.value) || 0,
            price: parseFloat(itemRefs.current[index].price.current.value) || 0,
            total:
                (parseInt(itemRefs.current[index].quantity.current.value) || 0) *
                (parseFloat(itemRefs.current[index].price.current.value) || 0),
        }));
        const invoiceData = {
            invoice_id: toInvoiceNumberRef.current.value,
            created_at: issueDate,
            payment_due: dueDate,
            description: toDescriptionRef.current.value,
            payment_terms: toTermsRef.current.value,
            client_name: toNameRef.current.value,
            client_email: toEmailRef.current.value,
            status: 'draft',
            sender_street: fromStreetRef.current.value,
            sender_city: fromCityRef.current.value,
            sender_postcode: fromPostalRef.current.value,
            sender_country: fromCountryRef.current.value,
            client_street: toStreetRef.current.value,
            client_city: toCityRef.current.value,
            client_postcode: toPostalRef.current.value,
            client_country: toCountryRef.current.value,
            total: totalPrice,
            items: itemData
        };

        dispatch(createNewInvoice(invoiceData));
        dispatch(toggleNewInvoice());
    };

    return (
        <>
            <div className={nightMode ? "formInvoiceMainContainer nightMode" : "formInvoiceMainContainer"}>
                <h2 className="formInvoiceHeading">New Invoice</h2>
                <div className="formInvoiceFormContentContainer">
                    <div className="formInvoiceMainElementsContainer">
                        {/* Bill From Section */}
                        <div className="formInvoiceBillFromContainer">
                            <span className="billFromLable">Bill From</span>
                            <div className="formInvoiceFromStreetContainer">
                                <span className="formInvoiceFromStreetLable">Street Address</span>
                                <input ref={fromStreetRef} type="text" className="formInvoiceFromStreetInput" />
                            </div>
                            <div className="formInvoiceFromCityContainer">
                                <span className="formInvoiceFromCityLable">City</span>
                                <input ref={fromCityRef} type="text" className="formInvoiceFromCityInput" />
                            </div>
                            <div className="formInvoiceFromPostalContainer">
                                <span className="formInvoiceFromPostalLable">Postal Code</span>
                                <input ref={fromPostalRef} type="text" className="formInvoiceFromPostalInput" />
                            </div>
                            <div className="formInvoiceFromCountryContainer">
                                <span className="formInvoiceFromCountryLable">Country</span>
                                <input ref={fromCountryRef} type="text" className="formInvoiceFromCountryInput" />
                            </div>
                        </div>
                        {/* Bill To Section */}
                        <div className="formInvoiceBillToContainer">
                            <span className="billToLable">Bill To</span>
                            <div className="formInvoiceToNameContainer">
                                <span className="formInvoiceToNameLable">Client's Name</span>
                                <input ref={toNameRef} type="text" className="formInvoiceToNameInput" />
                            </div>
                            <div className="formInvoiceToEmailContainer">
                                <span className="formInvoiceToEmailLable">Client's Email</span>
                                <input ref={toEmailRef} type="text" className="formInvoiceToEmailInput" />
                            </div>
                            <div className="formInvoiceToStreetContainer">
                                <span className="formInvoiceToStreetLable">Street Address</span>
                                <input ref={toStreetRef} type="text" className="formInvoiceToStreetInput" />
                            </div>
                            <div className="formInvoiceToCityContainer">
                                <span className="formInvoiceToCityLable">City</span>
                                <input ref={toCityRef} type="text" className="formInvoiceToCityInput" />
                            </div>
                            <div className="formInvoiceToPostalContainer">
                                <span className="formInvoiceToPostalLable">Postal Code</span>
                                <input ref={toPostalRef} type="text" className="formInvoiceToPostalInput" />
                            </div>
                            <div className="formInvoiceToCountryContainer">
                                <span className="formInvoiceToCountryLable">Country</span>
                                <input ref={toCountryRef} type="text" className="formInvoiceToCountryInput" />
                            </div>
                            <div className="formInvoiceToDateContainer">
                                <span className={missingDate ? "formInvoiceToDateLable missingValue" : "formInvoiceToDateLable"}>Invoice Date</span>
                                <input type="date" ref={toDateRef} className={missingDate ? "formInvoiceToDateInput missingValue" : "formInvoiceToDateInput"} />
                            </div>
                            <div className="formInvoiceToTermsContainer">
                                <span className="formInvoiceToTermsLable">Payment Terms</span>
                                <select ref={toTermsRef} className="formInvoiceToTermsSelect">
                                    <option value="1">Next Day</option>
                                    <option value="7">Next 7 Days</option>
                                    <option value="14">Next 14 Days</option>
                                    <option value="21">Next 21 Days</option>
                                    <option value="30">Next 30 Days</option>
                                    <option value="60">Next 60 Days</option>
                                    <option value="90">Next 90 Days</option>
                                </select>
                            </div>
                            <div className="formInvoiceToInvoiceNumberContainer">
                                <span className={missingNumber ? "formInvoiceToInvoiceNumberLable missingValue" : "formInvoiceToInvoiceNumberLable"}>Invoice Number</span>
                                <input ref={toInvoiceNumberRef} type="text" className={missingNumber ? "formInvoiceToInvoiceNumberInput missingValue" : "formInvoiceToInvoiceNumberInput"} />
                            </div>
                            <div className="formInvoiceToDescriptionContainer">
                                <span className="formInvoiceToDescriptionLable">Description</span>
                                <input ref={toDescriptionRef} type="text" className="formInvoiceToDescriptionInput" />
                            </div>
                        </div>
                    </div>
                    {/* Items Section */}
                    <div className="formInvoiceItemsContainer">
                        <span className='formInvoiceInvoiceItemsLable'>Invoice Items</span>
                        {items.map((item, index) => (
                            <div key={index} className="formInvoiceItem">
                                <div className="formInvoiceItemNameContainer">
                                    <span className="formInvoiceItemNameLable">Item Name</span>
                                    <input
                                        ref={itemRefs.current[index]?.name}
                                        type="text"
                                        className="formInvoiceItemNameInput"
                                        value={item.name}
                                        onChange={(e) => updateItem(index, "name", e.target.value)}
                                    />
                                </div>
                                <div className="formInvoiceItemQuantityContainer">
                                    <span className="formInvoiceItemQuantityLable">Quantity</span>
                                    <input
                                        ref={itemRefs.current[index]?.quantity}
                                        className="formInvoiceItemQuantityInput"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="formInvoiceItemPriceContainer">
                                    <span className="formInvoiceItemPriceLable">Price Per Unit</span>
                                    <input
                                        ref={itemRefs.current[index]?.price}
                                        className="formInvoiceItemPriceInput"
                                        value={item.price}
                                        onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="formInvoiceItemTotalPriceContainer">
                                    <span className="formInvoiceItemTotalLable">Total Price</span>
                                    <span className="formInvoiceItemTotalValue">£ {(item.quantity * item.price).toFixed(2)}</span>
                                </div>
                                <button className="itemRemoveButton" onClick={() => removeItem(index)}>
                                    <img className='trashIcon' src={trashIcon} alt="delete icon" /> delete
                                </button>
                            </div>
                        ))}
                        <button className="itemAddButton" onClick={addItem}>
                            <img className='formInvoicePlusIcon' src={plusIcon} alt="plus icon" />Add New Item
                        </button>
                    </div>
                    <div className="formInvoiceBottomLineContainer">
                        <span className="formInvoiceBottomLineLable">Total price for invoice</span>
                        <span className="formInvoiceBottomLineValue">£ {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="formInvoiceControlsContainer">
                        <button className="formInvoiceSave" onClick={handleAddNewInvoice}>Save</button>
                        <button className="formInvoiceCancel" onClick={handleCancelClick}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewInvoice;
