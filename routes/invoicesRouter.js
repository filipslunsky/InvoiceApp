const { Router } = require('express');
const {
    getInvoiceById,
    getAllInvoices,
    addInvoice,
    updateInvoiceById,
    deleteInvoice,
} = require('../controllers/invoicesController.js');

const invoicesRouter = Router();

invoicesRouter.get('/', getAllInvoices);
invoicesRouter.get('/:id', getInvoiceById);
invoicesRouter.post('/', addInvoice);
invoicesRouter.post('/:id', updateInvoiceById);
invoicesRouter.delete('/:id', deleteInvoice);

module.exports = invoicesRouter;