const { db } = require('../config/db.js');

// full invoices queries
const _getInvoiceById = async (id) => {
    try {
        const invoice = await db('invoices')
            .where('invoice_id', id)
            .first();

        if (!invoice) {
            return { success: false, message: 'Invoice not found' };
        }

        const items = await db('invoice_items')
            .where('invoice_id', id);

        const result = {
            ...invoice,
            items: items,
        };

        return { success: true, message: 'Invoice found', invoice: result };
    } catch (error) {
        console.error('Error fetching invoice by ID:', error);
        return { success: false, message: 'An error occurred while fetching the invoice' };
    }
};

const _getAllInvoices = async () => {
    try {
        const invoices = await db('invoices').select();

        if (!invoices || invoices.length === 0) {
            return { success: false, message: 'No invoices found' };
        }

        const items = await db('invoice_items').select();

        const invoicesWithItems = invoices.map((invoice) => ({
            ...invoice,
            items: items.filter((item) => item.invoice_id === invoice.invoice_id),
        }));

        return { success: true, message: 'Invoices found', invoices: invoicesWithItems };
    } catch (error) {
        console.error('Error fetching all invoices:', error);
        return { success: false, message: 'An error occurred while fetching invoices' };
    }
};


const _addInvoice = async (newInvoice) => {
    if (!newInvoice || !newInvoice.invoice_id) {
        return { success: false, message: 'Invalid invoice data, invoice ID is required' };
    }
    try {
        const existingInvoice = await db('invoices')
            .where('invoice_id', newInvoice.invoice_id)
            .first();

        if (existingInvoice) {
            return { success: false, message: 'Invoice with the same ID already exists' };
        }

        await db('invoices').insert({
            invoice_id: newInvoice.invoice_id,
            created_at: newInvoice.created_at,
            payment_due: newInvoice.payment_due,
            description: newInvoice.description,
            payment_terms: newInvoice.payment_terms,
            client_name: newInvoice.client_name,
            client_email: newInvoice.client_email,
            status: newInvoice.status,
            sender_street: newInvoice.sender_street,
            sender_city: newInvoice.sender_city,
            sender_postcode: newInvoice.sender_postcode,
            sender_country: newInvoice.sender_country,
            client_street: newInvoice.client_street,
            client_city: newInvoice.client_city,
            client_postcode: newInvoice.client_postcode,
            client_country: newInvoice.client_country,
            total: newInvoice.total,
        });

        const items = newInvoice.items.map((item) => ({
            invoice_id: newInvoice.invoice_id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
        }));

        await db('invoice_items').insert(items);

        return { success: true, message: 'New invoice added successfully', invoice: newInvoice };
    } catch (error) {
        console.error('Error adding invoice:', error);
        return { success: false, message: 'An error occurred while adding the invoice' };
    }
};


const _updateInvoiceById = async (id, updatedInvoice) => {
    console.log(id);
    console.log(updatedInvoice);
    try {
        const existingInvoice = await db('invoices')
            .where('invoice_id', id)
            .first();

        if (!existingInvoice) {
            return { success: false, message: 'Invoice not found' };
        }

        await db('invoices')
            .where('invoice_id', id)
            .update({
                created_at: updatedInvoice.created_at,
                payment_due: updatedInvoice.payment_due,
                description: updatedInvoice.description,
                payment_terms: updatedInvoice.payment_terms,
                client_name: updatedInvoice.client_name,
                client_email: updatedInvoice.client_email,
                status: updatedInvoice.status,
                sender_street: updatedInvoice.sender_street,
                sender_city: updatedInvoice.sender_city,
                sender_postcode: updatedInvoice.sender_postcode,
                sender_country: updatedInvoice.sender_country,
                client_street: updatedInvoice.client_street,
                client_city: updatedInvoice.client_city,
                client_postcode: updatedInvoice.client_postcode,
                client_country: updatedInvoice.client_country,
                total: updatedInvoice.total,
            });

        const existingItems = await db('invoice_items')
            .where('invoice_id', id);

        const updatedItemIds = updatedInvoice.items.map((item) => item.item_id);
        const existingItemIds = existingItems.map((item) => item.item_id);

        const itemsToUpdate = updatedInvoice.items.filter(
            (item) => existingItemIds.includes(item.item_id)
        );

        const itemsToAdd = updatedInvoice.items.filter(
            (item) => !existingItemIds.includes(item.item_id)
        );

        const itemsToDelete = existingItems.filter(
            (item) => !updatedItemIds.includes(item.item_id)
        );

        for (const item of itemsToUpdate) {
            await db('invoice_items')
                .where('item_id', item.item_id)
                .update({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total,
                });
        }

        if (itemsToAdd.length > 0) {
            const newItems = itemsToAdd.map((item) => ({
                invoice_id: id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.total,
            }));
            await db('invoice_items').insert(newItems);
        }

        for (const item of itemsToDelete) {
            await db('invoice_items').where('item_id', item.item_id).del();
        }

        return { success: true, message: 'Invoice and items updated successfully' };
    } catch (error) {
        console.error('Error updating invoice:', error);
        return { success: false, message: 'An error occurred while updating the invoice and items' };
    }
};



const _deleteInvoice = async (id) => {
    try {
        const existingInvoice = await db('invoices')
            .where('invoice_id', id)
            .first();

        if (!existingInvoice) {
            return { success: false, message: 'Invoice not found' };
        }

        await db('invoice_items').where('invoice_id', id).del();

        await db('invoices').where('invoice_id', id).del();

        return { success: true, message: `Invoice ${id} successfully deleted` };
    } catch (error) {
        console.error('Error deleting invoice:', error);
        return { success: false, message: 'An error occurred while deleting the invoice' };
    }
};

// invoice items queries

module.exports = {
    _getInvoiceById,
    _getAllInvoices,
    _addInvoice,
    _updateInvoiceById,
    _deleteInvoice,
};