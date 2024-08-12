import { createSelector } from '@reduxjs/toolkit';
import { EMPTY_SONG } from '@src/common/constants';
import { song, songs } from '@src/common/types';
import { RootState } from '@src/store';

export const selectSongs = (state: RootState) => state.songs.items;

export const selectCurrentSongId = (state: RootState) => state.currentSong;

export const selectCurrentSong = createSelector(
  [selectSongs, selectCurrentSongId],
  (songs: songs, currentSongId: number) => {
    const currentSongIndex = songs.findIndex(
      (song: song) => song.songId === currentSongId,
    );

    return songs[currentSongIndex] || EMPTY_SONG;
  },
);

export const selectCurrentSongTotalTakes = createSelector(
  [selectCurrentSong],
  (song: song) => song.totalTakes,
);

export const selectCurrentSongTitle = createSelector(
  [selectCurrentSong],
  (song: song) => song.title,
);

export const selectCurrentSongTakes = createSelector(
  [selectCurrentSong],
  (song: song) => song.takes,
);

export const selectCurrentSongSelectedTakeId = createSelector(
  [selectCurrentSong],
  (song: song) => song.selectedTakeId,
);
