import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const INVOICES_URL = `${import.meta.env.VITE_API_URL}/invoices`;

const initialState = {
    invoices: [],
    invoicesStatus: '',
    // currentInvoice: {},
    // currentInvoiceStatus: '',
    editInvoiceStatus: '',
    addInvoiceStatus: '',
    deleteInvoiceStatus: '',
    message: '',
    newInvoice: false,
    updateInvoice: false,
};

export const getInvoices = createAsyncThunk('inovices/getInvoices', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(INVOICES_URL);
        return response.data.invoices;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const createNewInvoice = createAsyncThunk('invoices/createNewInvoice', async (invoiceData, { rejectWithValue}) => {
    try {
        const response = await axios.post(INVOICES_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const editInvoice = createAsyncThunk('invoices/editInvoice', async (invoiceData, { rejectWithValue}) => {
    try {
        const response = await axios.post(`${INVOICES_URL}/${invoiceData.invoice_id}`);
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
                state.message = action.payload.message;
            })
            .addCase(editInvoice.rejected, (state, action) => {
                state.editInvoiceStatus = 'failed';
                state.message = action.payload.message;
            })
            .addCase(deleteInvoice.pending, (state) => {
                state.deleteInvoiceStatus = 'loading';
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                state.deleteInvoiceStatus = 'success';
                state.message = action.payload.message;
            })
            .addCase(deleteInvoice.rejected, (state, action) => {
                state.deleteInvoiceStatus = 'failed';
                state.message = action.payload.message;
            })
            .addCase(createNewInvoice.pending, (state) => {
                state.addInvoiceStatus = 'loading';
            })
            .addCase(createNewInvoice.fulfilled, (state, action) => {
                state.addInvoiceStatus = 'success';
                state.message = action.payload.message;
            })
            .addCase(createNewInvoice.rejected, (state, action) => {
                state.addInvoiceStatus = 'failed';
                state.message = action.payload.message;
            })
    },
});

export const { toggleNewInvoice, toggleUpdateInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
