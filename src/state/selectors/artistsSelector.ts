import { RootState } from '@src/state/store';

export const selectArtists = (state: RootState) => state.artists.items;
