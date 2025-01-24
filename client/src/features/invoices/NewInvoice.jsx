import { useState } from 'react';
import { useDispatch } from "react-redux";
import { toggleNewInvoice } from "./state/slice";

const NewInvoice = () => {
    const dispatch = useDispatch();

    const [items, setItems] = useState([{ name: "", quantity: 1, price: 0, total: 0 }]);

    const handleCancelClick = () => {
        dispatch(toggleNewInvoice());
    };

    const addItem = () => {
        setItems([...items, { name: "", quantity: 1, price: 0, total: 0 }]);
    };

    const updateItem = (index, field, value) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, [field]: value, total: field !== "total" ? item.quantity * item.price : item.total } : item
        );
        setItems(updatedItems);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="formInvoiceMainContainer">
                <h2 className="formInvoiceHeading">New Invoice</h2>
                <div className="formInvoiceFormContentContainer">
                    <div className="formInvoiceMainElementsContainer">
                        {/* Bill From Section */}
                        <div className="formInvoiceBillFromContainer">
                            <span className="billFromLable">Bill From</span>
                            <div className="formInvoiceFromStreetContainer">
                                <span className="formInvoiceFromStreetLable">Street Address</span>
                                <input type="text" className="formInvoiceFromStreetInput" />
                            </div>
                            <div className="formInvoiceFromStreetContainer">
                                <span className="formInvoiceFromCityLable">City</span>
                                <input type="text" className="formInvoiceFromCityInput" />
                            </div>
                            <div className="formInvoiceFromStreetContainer">
                                <span className="formInvoiceFromPostalLable">Postal Code</span>
                                <input type="text" className="formInvoiceFromPostalInput" />
                            </div>
                            <div className="formInvoiceFromStreetContainer">
                                <span className="formInvoiceFromCountryLable">Country</span>
                                <input type="text" className="formInvoiceFromCountryInput" />
                            </div>
                        </div>
                        {/* Bill To Section */}
                        <div className="formInvoiceBillToContainer">
                            <span className="billToLable">Bill To</span>
                            <div className="formInvoiceToNameContainer">
                                <span className="formInvoiceToNameLable">Client's Name</span>
                                <input type="text" className="formInvoiceToNameInput" />
                            </div>
                            <div className="formInvoiceToEmailContainer">
                                <span className="formInvoiceToEmailLable">Client's Email</span>
                                <input type="text" className="formInvoiceToEmailInput" />
                            </div>
                            <div className="formInvoiceToStreetContainer">
                                <span className="formInvoiceToStreetLable">Street Address</span>
                                <input type="text" className="formInvoiceToStreetInput" />
                            </div>
                            <div className="formInvoiceToStreetContainer">
                                <span className="formInvoiceToCityLable">City</span>
                                <input type="text" className="formInvoiceToCityInput" />
                            </div>
                            <div className="formInvoiceToStreetContainer">
                                <span className="formInvoiceToPostalLable">Postal Code</span>
                                <input type="text" className="formInvoiceToPostalInput" />
                            </div>
                            <div className="formInvoiceToStreetContainer">
                                <span className="formInvoiceToCountryLable">Country</span>
                                <input type="text" className="formInvoiceToCountryInput" />
                            </div>
                            <div className="formInvoiceToDateContainer">
                                <span className="formInvoiceToDateLable">Invoice Date</span>
                                <input type="text" className="formInvoiceToDateInput" />
                            </div>
                            <div className="formInvoiceToTermsContainer">
                                <span className="formInvoiceToTermsLable">Invoice Date</span>
                                <select className="formInvoiceToTermsSelect">
                                    <option value="1">Next Day</option>
                                    <option value="7">Next 7 Days</option>
                                    <option value="14">Next 14 Days</option>
                                    <option value="21">Next 21 Days</option>
                                    <option value="30">Next 30 Days</option>
                                    <option value="60">Next 60 Days</option>
                                    <option value="90">Next 90 Days</option>
                                </select>
                            </div>
                            <div className="formInvoiceToDescriptionContainer">
                                <span className="formInvoiceToDescriptionLable">Description</span>
                                <input type="text" className="formInvoiceToDescriptionInput" />
                            </div>
                        </div>
                    </div>
                    {/* Items Section */}
                    <div className="formInvoiceItemsContainer">
                    <h3>Invoice Items</h3>
                        {items.map((item, index) => (
                            <div key={index} className="formInvoiceItem">
                                <div className="formInvoiceItemNameContainer">
                                    <span className="formInvoiceItemNameLable">Item Name</span>
                                    <input
                                        type="text"
                                        className="formInvoiceItemNameInput"
                                        value={item.name}
                                        onChange={(e) => updateItem(index, "name", e.target.value)}
                                    />
                                </div>
                                <div className="formInvoiceItemQuantityContainer">
                                    <span className="formInvoiceItemNameLable">Quantity</span>
                                    <input
                                        className="formInvoiceItemNameInput"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="formInvoiceItemPriceContainer">
                                    <span className="formInvoiceItemNameLable">Price Per Unit</span>
                                    <input
                                        className="formInvoiceItemNameInput"
                                        value={item.price}
                                        onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="formInvoiceItemTotalPriceContainer">
                                    <span className="formInvoiceItemNameLable">Total Price</span>
                                    <span className="formInvoiceItemNameValue">£ {(item.quantity * item.price).toFixed(2)}</span>
                                </div>
                                <button className="itemRemoveButton" onClick={() => removeItem(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button className="itemAddButton" onClick={addItem}>
                            Add New Item
                        </button>
                    </div>
                    <div className="formInvoiceControlsContainer">
                        <button className="formInvoiceSave">Save</button>
                        <button className="formInvoiceCancel" onClick={handleCancelClick}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default NewInvoice;