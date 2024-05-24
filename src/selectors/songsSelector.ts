import { createSelector } from '@reduxjs/toolkit';
import { EMPTY_SONG } from '@src/common/constants';
import { song } from '@src/common/types';
import { RootState } from '@src/store';
import { selectCurrentSongId } from './currentSongIdSelector';

export const selectSongs = (state: RootState) => state.songs;

export const selectSongById = createSelector(
  [selectSongs, selectCurrentSongId],
  (songs: song[], currentSongId: number) =>
    songs.find(({ songId }: song) => songId === currentSongId || EMPTY_SONG),
);

export const selectTotalTakesBySongId = createSelector(
  [selectSongs, selectCurrentSongId],
  (songs: song[], currentSongId: number) => {
    const song = songs.find(
      ({ songId }: song) => songId === currentSongId || EMPTY_SONG,
    );
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

export const selectSongTitleBySongId = createSelector(
  [selectSongs, selectCurrentSongId],
  (songs: song[], currentSongId: number) => {
    const song = songs.find(
      ({ songId }: song) => songId === currentSongId || EMPTY_SONG,
    );
    return song ? song.title : '';
  },
);
