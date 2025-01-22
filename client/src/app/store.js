import { combineReducers, configureStore } from '@reduxjs/toolkit';
import invoicesSlice from '../features/invoices/state/slice.js';
import visualSlice from '../features/general/state/slice.js';

const appReducer = combineReducers({
    invoices: invoicesSlice,
    visual: visualSlice,
});

const store = configureStore({
    reducer: appReducer
});

export default store;
