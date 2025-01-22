import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    nightMode: false,
};

const visualSlice = createSlice({
    name: 'visual',
    initialState,
    reducers: {
        toggleNightMode: (state) => {
            state.nightMode = !state.nightMode;
        },
    },
});

export const { toggleNightMode } = visualSlice.actions;
export default visualSlice.reducer;