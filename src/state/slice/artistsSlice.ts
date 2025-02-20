import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Artist, Artists } from '@src/components/common/types';

type ArtistsSliceState = {
  items: Artists;
};

const initialState: ArtistsSliceState = {
  items: [],
};

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    addArtistSuccess: (
      state: ArtistsSliceState,
      action: PayloadAction<Artist>,
    ) => {
      state.items.push(action.payload);
    },
    fetchArtistsSuccess: (
      state: ArtistsSliceState,
      action: PayloadAction<Artist[]>,
    ) => {
      state.items = action.payload;
    },
    updateArtistSuccess: (
      state: ArtistsSliceState,
      action: PayloadAction<Artist>,
    ) => {
      console.log('success payload:', action.payload);
      const index = state.items.findIndex(
        (artist: Artist) => artist.artistId === action.payload.artistId,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeArtistSuccess: (
      state: ArtistsSliceState,
      action: PayloadAction<number>,
    ) => {
      state.items = state.items.filter(
        (artist: Artist) => artist.artistId !== action.payload,
      );
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
