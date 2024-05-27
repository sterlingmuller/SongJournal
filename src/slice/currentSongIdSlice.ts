import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CurrentSongIdSliceState = number;

const initialState: CurrentSongIdSliceState = -1;

const currentSongIdSlice = createSlice({
  name: 'currentSongId',
  initialState,
  reducers: {
    setCurrentSongId: (
      state: CurrentSongIdSliceState,
      action: PayloadAction<CurrentSongIdSliceState>,
    ) => (state = action.payload),
  },
});

export default currentSongIdSlice.reducer;
export const { setCurrentSongId } = currentSongIdSlice.actions;
