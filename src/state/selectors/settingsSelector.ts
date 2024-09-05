import { RootState } from '@src/state/store';

export const selectUserSettings = (state: RootState) => state.settings;

export const selectDefaultArtistId = (state: RootState) =>
  state.settings.defaultArtistId;
