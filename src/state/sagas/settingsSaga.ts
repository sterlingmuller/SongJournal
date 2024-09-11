import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { updateUserSettings } from '@src/data/repositories/SettingsRepository';
import { updateSettingsSuccess } from '@src/state/slice/settingsSlice';
import {
  startLoading,
  setError,
  endLoading,
} from '@src/state/slice/asyncSlice';
import * as at from '@src/state/sagas/actionTypes';
import { UpdateSettingsDbPayload } from '@src/components/common/types';

function* updateSettingsSaga(action: PayloadAction<UpdateSettingsDbPayload>) {
  yield put(startLoading());
  try {
    yield call(updateUserSettings, action.payload);
    yield put(updateSettingsSuccess(action.payload.updatedSettings));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* settingsSaga() {
  yield takeLatest(at.UPDATE_SETTINGS_REQUEST, updateSettingsSaga);
}
