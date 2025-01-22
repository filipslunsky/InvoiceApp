const {
    _getInvoiceById,
    _getAllInvoices,
    _addInvoice,
    _updateInvoiceById,
    _deleteInvoice,
} = require('../models/invoicesModel.js');

const getInvoiceById = (req, res) => {
    const { id } = req.params;
    const data = _getInvoiceById(id);
    if (data.success) {
        res.status(200).json(data);
    } else {
        res.status(404).json(data);
    };    
};

const getAllInvoices = (req, res) => {
    const data = _getAllInvoices();
    if (data.success) {
        res.status(200).json(data);
    } else {
        res.status(404).json(data);
    };
};

const addInvoice = (req, res) => {
    const { newInvoice } = req.body;
    const data = _addInvoice(newInvoice);
    if (data.success) {
        res.status(200).json(data);
    } else {
        res.status(400).json(data);
    };
};

const updateInvoiceById = (req, res) => {
    const { id } = req.params;
    const { invoiceData } = req.body;
    const data = _updateInvoiceById(id, invoiceData);
    if (data.success) {
        res.status(200).json(data);
    } else {
        res.status(404).json(data);
    };
};

const deleteInvoice = (req, res) => {
    const { id } = req.params;
    const data = _deleteInvoice(id);
    if (data.success) {
        res.status(200).json(data);
    } else {
        res.status(404).json(data);
    };
};

module.exports = {
    getInvoiceById,
    getAllInvoices,
    addInvoice,
    updateInvoiceById,
    deleteInvoice,
};