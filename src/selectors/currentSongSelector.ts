import { RootState } from '@src/store';

export const selectCurrentSong = (state: RootState) => state.currentSong;

export const selectCurrentSongTitle = (state: RootState) =>
  state.currentSong.title;

export const selectCurrentSongTakes = (state: RootState) =>
  state.currentSong.takes;

export const selectCurrentSongPage = (state: RootState) =>
  state.currentSong.page;
