import { RootState } from '@src/store';

export const selectCurrentSongPage = (state: RootState) =>
  state.pages.items[state.currentSong];
