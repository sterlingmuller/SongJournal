import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortBy } from '@src/components/common/enums';
import { UserSettings } from '@src/components/common/types';

const initialState: UserSettings = {
  defaultSortType: SortBy.DATE,
  isAscending: false,
  defaultArtistId: -1,
  isNumbered: false,
  hideTips: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettingsSuccess: (
      state: UserSettings,
      action: PayloadAction<Partial<UserSettings>>,
    ) => {
      state = { ...state, ...action.payload };
    },
    fetchSettingsSuccess: (
      state: UserSettings,
      action: PayloadAction<UserSettings>,
    ) => (state = action.payload),
  },
});

export const { updateSettingsSuccess, fetchSettingsSuccess } =
  settingsSlice.actions;
export default settingsSlice.reducer;
