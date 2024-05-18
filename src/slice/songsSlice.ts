import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { songInfo } from '@src/common/types';

type SliceState = songInfo[];

const initialState: SliceState = [];

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state: SliceState, action: PayloadAction<SliceState>) =>
      action.payload,
    removeSong: (state: SliceState, action: PayloadAction<number>) =>
      state.filter(({ songId }: songInfo) => songId !== action.payload),
    addSong: (state: SliceState, action: PayloadAction<songInfo>) => {
      state.push(action.payload);
    },
  },
});

export default songsSlice.reducer;
export const { setSongs, removeSong, addSong } = songsSlice.actions;
