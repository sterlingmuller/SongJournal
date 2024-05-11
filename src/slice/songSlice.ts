import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { song } from '@src/common/types';

type SliceState = { currentSong: song | null };

const initialState: SliceState = {
  currentSong: null,
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setCurrentSong: (state: SliceState, action: PayloadAction<song>) => {
      state.currentSong = action.payload;
    },
  },
});

export default songSlice.reducer;
export const { setCurrentSong } = songSlice.actions;
