import { RootState } from '@src/state/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectPlayingId = (state: RootState) => state.playback.id;

export const selectPlaybackUri = (state: RootState) => state.playback.uri;

export const selectIsPlaying = (state: RootState) => state.playback.isPlaying;

export const selectAudioPlayerInfo = createSelector(
  [
    (state: RootState) => state.playback.isPlaying,
    (state: RootState) => state.playback.uri,
  ],
  (isPlaying: boolean, uri: string) => ({
    isPlaying,
    uri,
  })
);

export const selectPlaybackDuration = (state: RootState) =>
  state.playback.duration;
