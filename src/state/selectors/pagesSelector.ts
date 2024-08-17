import { RootState } from '@src/state/store';

export const selectCurrentSongPage = (state: RootState) =>
  state.pages.items[state.currentSong];
