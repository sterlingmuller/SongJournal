import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { songInfo } from '@src/common/types';

type SliceState = songInfo[];

const initialState: SliceState = [];

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state: SliceState, action: PayloadAction<SliceState>) => {
      console.log('all songs from slice', action.payload);
      return action.payload;
    },
  },
});

export default songsSlice.reducer;
export const { setSongs } = songsSlice.actions;
