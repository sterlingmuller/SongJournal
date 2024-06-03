import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Audio } from 'expo-av';

interface PlaybackState {
  sound: Audio.Sound | null;
  isPlaying: boolean;
  currentUri: string | null;
}

const initialState: PlaybackState = {
  sound: null,
  isPlaying: false,
  currentUri: null,
};

const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    playTrack(state, action: PayloadAction<string>) {
      state.currentUri = action.payload;
      state.isPlaying = true;
    },
    pauseTrack(state) {
      state.isPlaying = false;
    },
    stopTrack(state) {
      state.isPlaying = false;
      state.currentUri = null;
      // Here, you'd also unload the sound object
      // You can use a thunk or saga for the async unload logic
    },
  },
});

export const { playTrack, pauseTrack, stopTrack } = playbackSlice.actions;
export default playbackSlice.reducer;
