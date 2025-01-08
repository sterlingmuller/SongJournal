import { createSelector } from '@reduxjs/toolkit';
import { SortBy } from '@src/components/common/enums';
import { Sort } from '@src/components/common/types';
import { RootState } from '@src/state/store';

export const selectUserSettings = (state: RootState) => state.settings;

export const selectDefaultArtistId = (state: RootState) =>
  state.settings.defaultArtistId;

export const selectIsNumbered = (state: RootState) => state.settings.isNumbered;

export const selectDisplayTips = (state: RootState) =>
  state.settings.displayTips;

export const selectConductor = (state: RootState) => state.settings.conductor;

export const selectCloudConnection = (state: RootState) =>
  state.settings.cloudConnection;

export const selectSyncSettings = (state: RootState) => ({
  isAutoSyncEnabled: state.settings.isAutoSyncEnabled,
  isStarredTakeConditionEnabled: state.settings.isStarredTakeConditionEnabled,
  isCompletedSongConditionEnabled:
    state.settings.isCompletedSongConditionEnabled,
});

export const selectDefaultSort = createSelector(
  [
    (state: RootState) => state.settings.defaultSortType,
    (state: RootState) => state.settings.isAscending,
  ],
  (sortType: SortBy, isAscending: boolean): Sort => ({
    sortType,
    isAscending,
  }),
);
