import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EMPTY_SONG } from '@src/common/constants';
import { song } from '@src/common/types';

type SliceState = {
  currentSong: song;
};

const initialState: SliceState = {
  currentSong: EMPTY_SONG,
};

const songSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    setCurrentSong: (state: SliceState, action: PayloadAction<song>) => {
      state.currentSong = action.payload;
    },
  },
});

export default songSlice.reducer;
export const { setCurrentSong } = songSlice.actions;
