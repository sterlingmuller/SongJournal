import { createSelector } from '@reduxjs/toolkit';
import { EMPTY_SONG } from '@src/components/common/constants';
import { Song, Songs, Take, Takes } from '@src/components/common/types';
import { RootState } from '@src/state/store';

export const selectSongs = (state: RootState) => state.songs.items;

export const selectCurrentSongId = (state: RootState) => state.currentSong;

export const selectCurrentSong = createSelector(
  [selectSongs, selectCurrentSongId],
  (songs: Songs, currentSongId: number) => {
    const currentSongIndex = songs.findIndex(
      (song: Song) => song.songId === currentSongId,
    );

    return songs[currentSongIndex] || EMPTY_SONG;
  },
);

export const selectCurrentSongTotalTakes = createSelector(
  [selectCurrentSong],
  (song: Song) => song.totalTakes,
);

export const selectCurrentSongTitle = createSelector(
  [selectCurrentSong],
  (song: Song) => song.title,
);

export const selectCurrentSongTakes = createSelector(
  [selectCurrentSong],
  (song: Song) => song.takes,
);

export const selectCurrentSongSelectedTakeId = createSelector(
  [selectCurrentSong],
  (song: Song) => song.selectedTakeId,
);

export const selectCurrentSongCompletionStatus = createSelector(
  [selectCurrentSong],
  (song: Song) => !!song.completed,
);

export const selectCurrentSongArtistId = createSelector(
  [selectCurrentSong],
  (song: Song) => song.artistId,
);

export const selectCurrentTakeUri = createSelector(
  [selectCurrentSongTakes, selectCurrentSongSelectedTakeId],
  (takes: Takes, selectedTakeId: number) => {
    const selectedTake: Take = takes.find(
      (take: Take) => take.takeId === selectedTakeId,
    );

    return selectedTake
      ? {
          currentTakeUri: selectedTake.uri,
          currentTakeTitle: selectedTake.title,
        }
      : null;
  },
);
