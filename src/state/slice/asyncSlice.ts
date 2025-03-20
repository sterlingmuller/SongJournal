import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AsyncSliceState = {
  isDbLoading: boolean;
  isLoading: boolean;
  error: Error | null;
};

const initialState: AsyncSliceState = {
  isDbLoading: false,
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
    startDbLoading: (state: AsyncSliceState) => {
      state.isDbLoading = true;
      state.error = null;
    },
    endDbLoading: (state: AsyncSliceState) => {
      state.isDbLoading = false;
    },
  },
});

export const {
  startLoading,
  setError,
  endLoading,
  startDbLoading,
  endDbLoading,
} = asyncSlice.actions;
export default asyncSlice.reducer;
