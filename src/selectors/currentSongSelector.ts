import { RootState } from '@src/store';

export const selectCurrentSong = (state: RootState) => state.currentSong;

export const selectCurrentSongTitle = (state: RootState) =>
  state.currentSong.title;

// export const selectCurrentSongTakes = (state: RootState) => {
//   return {
//     takes: state.currentSong.currentSong.takes,
//     selectedTake: state.currentSong.currentSong.selectedTake,
//   };
// };

// export const selectCurrentSongPage = (state: RootState) =>
//   state.currentSong.currentSong.page;

// export const selectCurrentSongInfo = (state: RootState) =>
//   state.currentSong.currentSong.page.info;
