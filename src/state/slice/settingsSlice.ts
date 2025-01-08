import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CloudConnection,
  Conductor,
  SortBy,
} from '@src/components/common/enums';
import { SyncSettings, UserSettings } from '@src/components/common/types';

const initialState: UserSettings = {
  defaultSortType: SortBy.DATE,
  isAscending: false,
  defaultArtistId: -1,
  isNumbered: false,
  displayTips: false,
  conductor: Conductor.EGG,
  cloudConnection: CloudConnection.NONE,
  isAutoSyncEnabled: false,
  isStarredTakeConditionEnabled: false,
  isCompletedSongConditionEnabled: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettingsSuccess: (
      state: UserSettings,
      action: PayloadAction<Partial<UserSettings>>,
    ) => (state = { ...state, ...action.payload }),
    updateCloudConnectionSuccess: (
      state: UserSettings,
      action: PayloadAction<CloudConnection>,
    ) => {
      state.cloudConnection = action.payload;
    },
    updateSyncSettingsSuccess: (
      state: UserSettings,
      action: PayloadAction<SyncSettings>,
    ) => {
      state.isAutoSyncEnabled = action.payload.isAutoSyncEnabled;
      state.isCompletedSongConditionEnabled =
        action.payload.isCompletedSongConditionEnabled;
      state.isStarredTakeConditionEnabled =
        action.payload.isStarredTakeConditionEnabled;
    },
    fetchSettingsSuccess: (
      state: UserSettings,
      action: PayloadAction<UserSettings>,
    ) => (state = action.payload),
  },
});

export const {
  updateSettingsSuccess,
  updateCloudConnectionSuccess,
  fetchSettingsSuccess,
} = settingsSlice.actions;
export default settingsSlice.reducer;
