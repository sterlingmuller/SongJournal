import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/store';

export const selectCurrentTake = (state: RootState) => state.currentTake;

export const selectCurrentTakeTitle = (state: RootState) =>
  state.currentTake.title;
