import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/state/store';
import { selectCoverSongs } from './songsSelector';

export const selectArtists = (state: RootState) => state.artists.items;

export const selectArtistById = (artistId: number) =>
  createSelector([selectArtists], (artists) =>
    artists.find((artist) => artist.artistId === artistId),
  );

export const selectArtistsWithCovers = createSelector(
  [selectArtists, selectCoverSongs],
  (artists, coverSongs) => {
    // Get unique artist IDs from cover songs
    const coverArtistIds = new Set(coverSongs.map(song => song.artistId));

    // Filter artists to only those who have cover songs and sort alphabetically descending
    return artists
      .filter(artist => coverArtistIds.has(artist.artistId))
      .map(artist => ({
        ...artist,
        coverCount: coverSongs.filter(song => song.artistId === artist.artistId).length
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
);
