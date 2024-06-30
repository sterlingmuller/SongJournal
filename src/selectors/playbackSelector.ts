import { RootState } from '@src/store';

export const selectPlayingTakeId = (state: RootState) => state.playback.takeId;

export const selectIsPlaying = (state: RootState) => state.playback.isPlaying;

export const selectPlaybackInfo = (state: RootState) => state.playback;
