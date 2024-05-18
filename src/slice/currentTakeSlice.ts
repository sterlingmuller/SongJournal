import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { take } from '@src/common/types';

type SliceState = take;

const initialState: SliceState = {
  takeId: -1,
  songId: -1,
  title: 'Take 1',
  date: '',
  notes: '',
};

const currentTakeSlice = createSlice({
  name: 'currentTake',
  initialState,
  reducers: {
    setCurrentTake: (state: SliceState, action: PayloadAction<SliceState>) =>
      action.payload,
  },
});

export default currentTakeSlice.reducer;
export const { setCurrentTake } = currentTakeSlice.actions;
