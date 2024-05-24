import { createSlice } from '@reduxjs/toolkit';

type SliceState = { isLoading: boolean };

const initialState: SliceState = {
  isLoading: false,
};

const takeSlice = createSlice({
  name: 'take',
  initialState,
  reducers: {
    createTakeRequest: (state: SliceState) => {
      state.isLoading = true;
    },
    createTakeSuccess: (state: SliceState) => {
      state.isLoading = false;
    },
    createTakeFailure: (state: SliceState) => {
      state.isLoading = false;
    },
  },
});

export default takeSlice.reducer;
export const { createTakeRequest, createTakeSuccess, createTakeFailure } =
  takeSlice.actions;
