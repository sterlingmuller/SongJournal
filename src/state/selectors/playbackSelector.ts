import { RootState } from '@src/state/store';

export const selectPlayingId = (state: RootState) => state.playback.id;

export const selectIsPlaying = (state: RootState) => state.playback.isPlaying;

export const selectPlaybackInfo = (state: RootState) => state.playback;

export const selectPlaybackDuration = (state: RootState) =>
  state.playback.duration;
