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

type TakeSliceState = { isLoading: boolean; error: Error | null };

const initialState: TakeSliceState = {
  isLoading: false,
  error: null,
};

const takeSlice = createSlice({
  name: 'take',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TakeSliceState>) => {
    builder
      .addCase(at.CREATE_TAKE_REQUEST, (state: TakeSliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTakeSuccess, (state: TakeSliceState) => {
        state.isLoading = false;
      })
      .addCase(
        createTakeFailure,
        (state: TakeSliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export default takeSlice.reducer;
