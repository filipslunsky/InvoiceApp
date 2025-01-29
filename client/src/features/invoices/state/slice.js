import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const INVOICES_URL = `${import.meta.env.VITE_API_URL}/invoices`;

const initialState = {
    invoices: [],
    invoicesStatus: 'idle',
    editInvoiceStatus: 'idle',
    addInvoiceStatus: 'idle',
    deleteInvoiceStatus: 'idle',
    newInvoice: false,
    updateInvoice: false,
    statusMessageDisplay: false,
    statusMessage: {
        text: '',
        style: '',
        visible: false,
    },
};

export const getInvoices = createAsyncThunk('inovices/getInvoices', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(INVOICES_URL);
        return response.data.invoices;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const createNewInvoice = createAsyncThunk('invoices/createNewInvoice', async (newInvoiceData, { rejectWithValue}) => {
    const items = newInvoiceData.items;

    const itemsWithInvoiceId = newInvoiceData.items.map((item) => ({
        ...item,
        invoice_id: newInvoiceData.invoice_id,
    }));

    const invoiceData = {
        ...newInvoiceData,
        items: itemsWithInvoiceId,
    };


    try {
        const response = await axios.post(INVOICES_URL, {invoiceData});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const editInvoice = createAsyncThunk('invoices/editInvoice', async (invoiceData, { rejectWithValue}) => {
    try {
        const response = await axios.post(`${INVOICES_URL}/${invoiceData.invoice_id}`, {invoiceData});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const deleteInvoice = createAsyncThunk('invoices/deleteInvoice', async (invoiceId, { rejectWithValue}) => {
    try {
        const response = await axios.delete(`${INVOICES_URL}/${invoiceId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        toggleNewInvoice: (state) => {
            state.newInvoice = !state.newInvoice;
        },
        toggleUpdateInvoice: (state) => {
            state.updateInvoice = !state.updateInvoice;
        },
        resetAddInvoiceStatus: (state) => {
            state.addInvoiceStatus = 'idle';
        },
        resetEditInvoiceStatus: (state) => {
            state.editInvoiceStatus = 'idle';
        },
        resetDeleteInvoiceStatus: (state) => {
            state.deleteInvoiceStatus = 'idle';
        },
        setStatusMessage: (state, action) => {
            state.statusMessage = {
                text: action.payload.text,
                visible: action.payload.visible,
                style: action.payload.style,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInvoices.pending, (state) => {
                state.invoicesStatus = 'loading';
            })
            .addCase(getInvoices.fulfilled, (state, action) => {
                state.invoices = action.payload;
                state.invoicesStatus = 'success';
            })
            .addCase(getInvoices.rejected, (state, action) => {
                console.error('Error loading invoices:', action.payload || 'An unexpected error occurred');
                state.invoicesStatus = 'failed';
            })
            .addCase(editInvoice.pending, (state) => {
                state.editInvoiceStatus = 'loading';
            })
            .addCase(editInvoice.fulfilled, (state, action) => {
                state.editInvoiceStatus = 'success';
            })
            .addCase(editInvoice.rejected, (state, action) => {
                state.editInvoiceStatus = 'failed';
            })
            .addCase(deleteInvoice.pending, (state) => {
                state.deleteInvoiceStatus = 'loading';
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                state.deleteInvoiceStatus = 'success';
            })
            .addCase(deleteInvoice.rejected, (state, action) => {
                state.deleteInvoiceStatus = 'failed';
            })
            .addCase(createNewInvoice.pending, (state) => {
                state.addInvoiceStatus = 'loading';
            })
            .addCase(createNewInvoice.fulfilled, (state, action) => {
                state.addInvoiceStatus = 'success';
            })
            .addCase(createNewInvoice.rejected, (state, action) => {
                state.addInvoiceStatus = 'failed';
            })
    },
});

export const { toggleNewInvoice, toggleUpdateInvoice, resetAddInvoiceStatus, resetEditInvoiceStatus, resetDeleteInvoiceStatus, setStatusMessage } = invoicesSlice.actions;
export default invoicesSlice.reducer;
