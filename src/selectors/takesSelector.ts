import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/store';
import { selectSongs } from './songsSelector';
import { selectCurrentSongId } from './currentSongSelector';
import { song } from '@src/common/types';
import { EMPTY_SONG } from '@src/common/constants';

// const selectTakes = (state: RootState) => state.take;

// get takes from db, add to songs on redux, memoize

export const selectTakesBySongId = createSelector(
  [selectSongs, selectCurrentSongId],
  (songs: song[], currentSongId: number) => {
    const song = songs.find(
      ({ songId }: song) => songId === currentSongId || EMPTY_SONG,
    );

    return song ? song.takes : [];
  },
);
