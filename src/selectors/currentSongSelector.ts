import { RootState } from '@src/store';

export const selectSongById = (state: RootState) => state.currentSong;

export const selectCurrentSongTitle = (state: RootState) =>
  state.currentSong.title;

export const selectCurrentSongTakes = (state: RootState) =>
  state.currentSong.takes;

// export const selectCurrentSongId = (state: RootState) =>
//   state.currentSong.songId;

export const selectCurrentSongTotalTakes = (state: RootState) =>
  state.currentSong.totalTakes;

export const selectCurrentSongPage = (state: RootState) =>
  state.currentSong.page;
