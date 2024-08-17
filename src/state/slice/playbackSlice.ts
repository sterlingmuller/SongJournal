import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PlaybackPayload } from '@src/components/common/types';

interface PlaybackState {
  isPlaying: boolean;
  uri: string | null;
  id: number;
}

const initialState: PlaybackState = {
  isPlaying: false,
  uri: null,
  id: -1,
};

const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    startPlayback: (
      state: PlaybackState,
      action: PayloadAction<PlaybackPayload>,
    ) => {
      state.isPlaying = true;
      state.uri = action.payload.uri;
      state.id = action.payload.id;
    },
    resumePlayback: (state: PlaybackState) => {
      state.isPlaying = true;
    },
    pausePlayback: (state: PlaybackState) => {
      state.isPlaying = false;
    },
    stopPlayback: () => initialState,
  },
});

export const { startPlayback, resumePlayback, pausePlayback, stopPlayback } =
  playbackSlice.actions;
export default playbackSlice.reducer;
