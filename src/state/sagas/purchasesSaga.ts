import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  startLoading,
  setError,
  endLoading,
} from '@src/state/slice/asyncSlice';
import * as at from '@src/state/sagas/actionTypes';
import { UpdatePurchasesDbPayload } from '@src/components/common/types';
import { updatePurchases } from '@src/data/repositories/PurchasesRepository';
import { updatePurchasesSuccess } from '@src/state/slice/purchasesSlice';

function* updatePurchasesSaga(action: PayloadAction<UpdatePurchasesDbPayload>) {
  yield put(startLoading());
  try {
    yield call(updatePurchases, action.payload);
    yield put(updatePurchasesSuccess(action.payload.updatedPurchases));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* purchasesSaga() {
  yield takeLatest(at.UPDATE_PURCHASES_REQUEST, updatePurchasesSaga);
}
