import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PlaybackPayload } from '@src/components/common/types';

interface PlaybackState {
  isPlaying: boolean;
  uri: string | null;
  id: number;
  duration: number;
}

const initialState: PlaybackState = {
  isPlaying: false,
  uri: null,
  id: -1,
  duration: 0,
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
      state.duration = action.payload.duration;
    },
    resumePlayback: (state: PlaybackState) => {
      state.isPlaying = true;
    },
    pausePlayback: (state: PlaybackState) => {
      state.isPlaying = false;
    },
    stopPlayback: () => initialState,
    updatePlaybackDuration: (
      state: PlaybackState,
      action: PayloadAction<number>,
    ) => {
      state.duration = action.payload;
    },
  },
});

export const {
  startPlayback,
  resumePlayback,
  pausePlayback,
  stopPlayback,
  updatePlaybackDuration,
} = playbackSlice.actions;
export default playbackSlice.reducer;
