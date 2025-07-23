import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Artist, Artists } from '@src/components/common/types';
import { compareArtistNames } from '@src/utils/artistSort';

type ArtistsSliceState = {
  items: Artists;
};

const initialState: ArtistsSliceState = {
  items: [],
};

const sortArtists = (artists: Artists): Artists => {
  return [...artists].sort((a: Artist, b: Artist) => compareArtistNames(a.name, b.name));
};

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    addArtistSuccess: (
      state: ArtistsSliceState,
      action: PayloadAction<Artist>,
    ) => {
      state.items = sortArtists([...state.items, action.payload]);
    },
    fetchArtistsSuccess: (
      state: ArtistsSliceState,
      action: PayloadAction<Artist[]>,
    ) => {
      state.items = sortArtists(action.payload);
    },
    updateArtistSuccess: (
      state: ArtistsSliceState,
      action: PayloadAction<Artist>,
    ) => {
      const index = state.items.findIndex(
        (artist: Artist) => artist.artistId === action.payload.artistId
      );

      if (index !== -1) {
        state.items[index] = action.payload;
        state.items = sortArtists(state.items);
      } else {
        state.items = sortArtists([...state.items, action.payload]);
      }
    },
    removeArtistSuccess: (
      state: ArtistsSliceState,
      action: PayloadAction<number>,
    ) => {
      const index = state.items.findIndex(
        (artist: Artist) => artist.artistId === action.payload
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const {
  addArtistSuccess,
  fetchArtistsSuccess,
  updateArtistSuccess,
  removeArtistSuccess,
} = artistSlice.actions;
export default artistSlice.reducer;
