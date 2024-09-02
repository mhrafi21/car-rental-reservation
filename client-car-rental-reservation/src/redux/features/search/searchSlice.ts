// src/store/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    location: string;
    date: string
    status: string
}

const initialState: SearchState = {
    location: '',
    date: '',
    status: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchParams: (state, action: PayloadAction<SearchState>) => {
            state.location = action.payload.location;
            state.date= action.payload.date;
            state.status = action.payload.status;
        },
    },
});

export const { setSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
