import { combineReducers, configureStore } from '@reduxjs/toolkit';
import invoicesSlice from '../features/invoices/state/slice.js';

const appReducer = combineReducers({
    invoices: invoicesSlice,
});

const store = configureStore({
    reducer: appReducer
});

export default store;
