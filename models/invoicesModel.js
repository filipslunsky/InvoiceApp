const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../config/data/data.json');

// auxiliary functions
const readJsonFile = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

const writeJsonFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// JSON requests
const _getInvoiceById = (id) => {
    const result = readJsonFile();
    const data = result.find((item) => item.id.toLowerCase() === id.toLowerCase());
    if (data) {
        return {success: true, message: 'invoice found', data};
    } else {
        return {success: false, message: 'invoice not found'};
    };
};

const _getAllInvoices = () => {
    const data = readJsonFile();
    if (data) {
        return {success: true, message: 'invoices found', data};
    } else {
        return {success: false, message: 'no invoices not found'};
    };
};

const _addInvoice = (newInvoice) => {
    if (!newInvoice || !newInvoice.id) {
        return { success: false, message: 'invalid invoice data, invoice ID is required' };
    }

    const data = readJsonFile();
    const existingInvoice = data.find((item) => item.id.toLowerCase() === newInvoice.id.toLowerCase());

    if (existingInvoice) {
        return { success: false, message: 'invoice with the same ID already exists.' };
    }

    data.push(newInvoice);
    writeJsonFile(data);
    return { success: true, message: 'new invoice added successfully', data: newInvoice };
};

const _updateInvoiceById = (id, updatedInvoice) => {
    const data = readJsonFile();
    const index = data.findIndex((item) => item.id.toLowerCase() === id.toLowerCase());
    if (index === -1) {
        return {success: false, message: 'invoice not found'}
    } else {
        data[index] = { ...data[index], ...updatedInvoice };
        writeJsonFile(data);
        return {success: true, message: 'invoice updated successfully', data};
    };
};

const _deleteInvoice = (id) => {
    const data = readJsonFile();
    const filteredData = data.filter((item) => item.id.toLowerCase() !== id.toLowerCase());
    if (filteredData.length === data.length) {
        return {success: false, message: 'invoice not found'};
    } else {
        writeJsonFile(filteredData);
        return {success: true, message: `invoice ${id} successfully deleted`};
    };
};

module.exports = {
    _getInvoiceById,
    _getAllInvoices,
    _addInvoice,
    _updateInvoiceById,
    _deleteInvoice,
};