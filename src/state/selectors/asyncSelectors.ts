import { RootState } from '@src/state/store';

export const selectIsDbLoading = (state: RootState) => state.async.isDbLoading;
