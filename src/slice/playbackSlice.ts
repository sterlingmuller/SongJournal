import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { playbackPayload } from '@src/common/types';

interface PlaybackState {
  isPlaying: boolean;
  uri: string | null;
  takeId: number;
}

const initialState: PlaybackState = {
  isPlaying: false,
  uri: null,
  takeId: -1,
};

const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    startPlayback(state, action: PayloadAction<playbackPayload>) {
      state.isPlaying = true;
      state.uri = action.payload.uri;
      state.takeId = action.payload.takeId;
    },
    resumePlayback(state) {
      state.isPlaying = true;
    },
    pausePlayback(state) {
      state.isPlaying = false;
    },
    stopPlayback(state) {
      state.isPlaying = false;
      state.uri = null;
      state.takeId = -1;
    },
  },
});

export const { startPlayback, resumePlayback, pausePlayback, stopPlayback } =
  playbackSlice.actions;
export default playbackSlice.reducer;
