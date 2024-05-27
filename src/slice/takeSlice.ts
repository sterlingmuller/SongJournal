import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

import {
  createTakeFailure,
  createTakeSuccess,
} from '@src/sagas/actionCreators';
import * as at from '@src/sagas/actionTypes';

type SliceState = { isLoading: boolean; error: Error | null };

const initialState: SliceState = {
  isLoading: false,
  error: null,
};

const takeSlice = createSlice({
  name: 'take',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<SliceState>) => {
    builder
      .addCase(at.CREATE_TAKE_REQUEST, (state: SliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTakeSuccess, (state: SliceState) => {
        state.isLoading = false;
      })
      .addCase(
        createTakeFailure,
        (state: SliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export default takeSlice.reducer;
// export const {} = takeSlice.actions;
