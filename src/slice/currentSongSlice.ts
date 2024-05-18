import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EMPTY_SONG } from '@src/common/constants';
import { song } from '@src/common/types';

type SliceState = song;

const initialState: SliceState = EMPTY_SONG;

const currentSongSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    setCurrentSong: (state: SliceState, action: PayloadAction<SliceState>) =>
      action.payload,
  },
});

export default currentSongSlice.reducer;
export const { setCurrentSong } = currentSongSlice.actions;
