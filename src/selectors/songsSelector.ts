import { createSelector } from '@reduxjs/toolkit';
import { song } from '@src/common/types';
import { RootState } from '@src/store';
import { selectCurrentSongIndex } from '@src/selectors/currentSongSelector';

export const selectSongs = (state: RootState) => state.songs.songs;

export const selectSongByIndex = createSelector(
  [selectSongs, selectCurrentSongIndex],
  (songs: song[], currentSongIndex: number) => songs[currentSongIndex],
);

export const selectTotalTakesBySongIndex = createSelector(
  [selectSongs, selectCurrentSongIndex],
  (songs: song[], currentSongIndex: number) => {
    const song = songs[currentSongIndex];

    return song ? song.totalTakes : 0;
  },
);

// Have this grab takes where song id, not songs
// export const selectTakesBySongId = createSelector(
//   [selectSongs, selectCurrentSongId],
//   (songs: song[], currentSongId: number) => {
//     const song = songs.find(
//       ({ songId }: song) => songId === currentSongId || EMPTY_SONG,
//     );
//     console.log('testing song: ', song);
//     return song ? song.takes : [];
//   },
// );

export const selectSongTitleBySongIndex = createSelector(
  [selectSongs, selectCurrentSongIndex],
  (songs: song[], currentSongIndex: number) => {
    const song = songs[currentSongIndex];
    return song ? song.title : '';
  },
);
