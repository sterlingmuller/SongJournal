import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EMPTY_PAGE } from '@src/common/constants';
import { page } from '@src/common/types';

type SliceState = page;

const initialState: SliceState = EMPTY_PAGE;

const songSlice = createSlice({
  name: 'currentSongPage',
  initialState,
  reducers: {
    setCurrentSongPage: (
      state: SliceState,
      action: PayloadAction<SliceState>,
    ) => {
      state = action.payload;
    },
  },
});

export default songSlice.reducer;
export const { setCurrentSongPage } = songSlice.actions;
