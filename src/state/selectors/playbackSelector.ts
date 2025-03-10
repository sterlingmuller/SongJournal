import { RootState } from '@src/state/store';

export const selectPlayingId = (state: RootState) => state.playback.id;

export const selectIsPlaying = (state: RootState) => state.playback.isPlaying;

export const selectAudioPlayerInfo = (state: RootState) => ({
  isPlaying: state.playback.isPlaying,
  uri: state.playback.uri,
});

export const selectPlaybackDuration = (state: RootState) =>
  state.playback.duration;
