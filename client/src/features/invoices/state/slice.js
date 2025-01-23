import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const INVOICES_URL = `${import.meta.env.VITE_API_URL}/invoices`;

const initialState = {
    invoices: [],
    invoicesStatus: '',
    currentInvoice: {},
    currentInvoiceStatus: '',
    editInvoiceStatus: '',
    addInvoiceStatus: '',
    deleteInvoiceStatus: '',
    newInvoice: false,
};

export const getInvoices = createAsyncThunk('inovices/getInvoices', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(INVOICES_URL);
        return response.data.invoices;
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
    },
});

export const { toggleNewInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
