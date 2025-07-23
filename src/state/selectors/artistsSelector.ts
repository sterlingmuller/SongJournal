import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/state/store';
import { selectCoverSongs } from './songsSelector';
import { compareArtistNames } from '@src/utils/artistSort';

export const selectArtists = (state: RootState) => state.artists.items;

export const selectArtistById = (artistId: number) =>
  createSelector([selectArtists], artists =>
    artists.find(artist => artist.artistId === artistId)
  );

export const selectArtistsWithCovers = createSelector(
  [selectArtists, selectCoverSongs],
  (artists, coverSongs) => {
    const coverArtistIds = new Set(coverSongs.map(song => song.artistId));

    return artists
      .filter(artist => coverArtistIds.has(artist.artistId))
      .map(artist => ({
        ...artist,
        coverCount: coverSongs.filter(song => song.artistId === artist.artistId)
          .length,
      }))
      .sort((a, b) => compareArtistNames(a.name, b.name));
  }
);
