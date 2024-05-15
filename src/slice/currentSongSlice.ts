import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EMPTY_SONG } from '@src/common/constants';
import { song } from '@src/common/types';

type SliceState = {
  songId: number;
  title: string;
  // date: string;
};

const initialState: SliceState = {
  songId: -1,
  title: '',
  // date: '',
};

const songSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    setCurrentSong: (state: SliceState, action: PayloadAction<SliceState>) => {
      state = action.payload;
    },
  },
});

export default songSlice.reducer;
export const { setCurrentSong } = songSlice.actions;
