import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Purchases } from '@src/components/common/types';

const initialState: Purchases = {
  hasBadEgg: false,
  hasCacsus: false,
  hasDeadAdim: false,
  hasPro: false,
};

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    updatePurchasesSuccess: (
      state: Purchases,
      action: PayloadAction<Partial<Purchases>>,
    ) => (state = { ...state, ...action.payload }),
    fetchPurchasesSuccess: (
      state: Purchases,
      action: PayloadAction<Purchases>,
    ) => (state = action.payload),
  },
});

export const { updatePurchasesSuccess, fetchPurchasesSuccess } =
  purchasesSlice.actions;
export default purchasesSlice.reducer;
