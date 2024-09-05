import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchUserSettings,
  updateUserSettings,
} from '@src/data/repositories/SettingsRepository';
import {
  fetchSettingsSuccess,
  updateSettingsSuccess,
} from '@src/state/slice/settingsSlice';
import {
  startLoading,
  setError,
  endLoading,
} from '@src/state/slice/asyncSlice';
import * as at from '@src/state/sagas/actionTypes';
import { UpdateSettingsDbPayload } from '@src/components/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

function* fetchSettingsSaga(action: PayloadAction<SQLiteDatabase>) {
  yield put(startLoading());
  try {
    const settings = yield call(fetchUserSettings, action.payload);
    yield put(fetchSettingsSuccess(settings));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* updateSettingsSaga(action: PayloadAction<UpdateSettingsDbPayload>) {
  yield put(startLoading());
  try {
    yield call(updateUserSettings, action.payload);
    yield put(updateSettingsSuccess(action.payload.newSettings));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* settingsSaga() {
  yield takeLatest(at.FETCH_SETTINGS_REQUEST, fetchSettingsSaga);
  yield takeLatest(at.UPDATE_SETTINGS_REQUEST, updateSettingsSaga);
}
