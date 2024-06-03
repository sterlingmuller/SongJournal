import { RootState } from '@src/store';

export const selectIsPlaying = (state: RootState) => state.playback.isPlaying;

export const selectCurrentUri = (state: RootState) => state.playback.currentUri;

export const selectSound = (state: RootState) => state.playback.sound;
