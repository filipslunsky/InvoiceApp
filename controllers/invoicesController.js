const {
    _getInvoiceById,
    _getAllInvoices,
    _addInvoice,
    _updateInvoiceById,
    _deleteInvoice,
} = require('../models/invoicesModel.js');

const getInvoiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await _getInvoiceById(id);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(404).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    };    
};

const getAllInvoices = async (req, res) => {
    try {
        const data = await _getAllInvoices();
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(404).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const addInvoice = async (req, res) => {
    const { invoiceData } = await req.body;
    try {
        const data = await _addInvoice(invoiceData);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updateInvoiceById = async (req, res) => {
    const { id } = req.params;
    const { invoiceData } = req.body;
    try {
            const data = await _updateInvoiceById(id, invoiceData);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(404).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deleteInvoice = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await _deleteInvoice(id);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(404).json(data);
        };    
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    getInvoiceById,
    getAllInvoices,
    addInvoice,
    updateInvoiceById,
    deleteInvoice,
};