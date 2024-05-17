import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EMPTY_SONG_INFO } from '@src/common/constants';

type SliceState = {
  songId: number;
  title: string;
  selectedTake: number;
};

const initialState: SliceState = EMPTY_SONG_INFO;

const songSlice = createSlice({
  name: 'currentSongInfo',
  initialState,
  reducers: {
    setCurrentSongInfo: (
      state: SliceState,
      action: PayloadAction<SliceState>,
    ) => {
      state = action.payload;
    },
  },
});

export default songSlice.reducer;
export const { setCurrentSongInfo } = songSlice.actions;
