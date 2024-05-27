import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/store';
import { selectSongs } from '@src/selectors/songsSelector';
import { song, songs } from '@src/common/types';

export const selectCurrentSongId = (state: RootState) => state.currentSong;

export const selectCurrentSongIndex = createSelector(
  [selectSongs, selectCurrentSongId],
  (songs: songs, currentSongId: number) =>
    songs.findIndex((song: song) => song.songId === currentSongId),
);
