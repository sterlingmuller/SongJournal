import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AsyncSliceState = {
  isLoading: boolean;
  error: Error | null;
};

const initialState: AsyncSliceState = {
  isLoading: false,
  error: null,
};

const asyncSlice = createSlice({
  name: 'async',
  initialState,
  reducers: {
    startLoading: (state: AsyncSliceState) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state: AsyncSliceState, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    endLoading: (state: AsyncSliceState) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, setError, endLoading } = asyncSlice.actions;
export default asyncSlice.reducer;
