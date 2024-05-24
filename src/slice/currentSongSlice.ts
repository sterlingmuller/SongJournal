import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EMPTY_SONG } from '@src/common/constants';
import { song, take } from '@src/common/types';

type SongSliceState = song;

const initialState: SongSliceState = EMPTY_SONG;

const currentSongSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    setCurrentSong: (
      state: SongSliceState,
      action: PayloadAction<SongSliceState>,
    ) => action.payload,
    addTake: (state: SongSliceState, action: PayloadAction<take>) => {
      console.log('addTake', action.payload);
      state.takes.push(action.payload);
      state.totalTakes++;
    },
  },
});

export default currentSongSlice.reducer;
export const { setCurrentSong, addTake } = currentSongSlice.actions;
