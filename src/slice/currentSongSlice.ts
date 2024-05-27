import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CurrentSongIdSliceState = number;

const initialState: CurrentSongIdSliceState = -1;

const currentSongSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    setCurrentSongId: (
      state: CurrentSongIdSliceState,
      action: PayloadAction<CurrentSongIdSliceState>,
    ) => (state = action.payload),
  },
});

export default currentSongSlice.reducer;
export const { setCurrentSongId } = currentSongSlice.actions;
