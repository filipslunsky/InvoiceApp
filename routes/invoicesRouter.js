const { Router } = require('express');
const {
    getInvoiceById,
    getAllInvoices,
    addInvoice,
    updateInvoiceById,
} = require('../controllers/invoicesController.js');

const invoicesRouter = Router();

invoicesRouter.get('/', getAllInvoices);
invoicesRouter.get('/:id', getInvoiceById);
invoicesRouter.post('/', addInvoice);
invoicesRouter.put('/:id', updateInvoiceById);

module.exports = invoicesRouter;