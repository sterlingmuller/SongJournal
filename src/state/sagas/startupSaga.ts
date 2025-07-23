import { call, put, takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SQLiteDatabase } from 'expo-sqlite';

import { fetchSongsWithArtists } from '@src/data/repositories/SongsRepository';
import {
  Artists,
  Purchases,
  Song,
  Songs,
  Take,
  Takes,
  UserSettings,
} from '@src/components/common/types';
import { fetchSongsWithTakesSuccess } from '@src/state/slice/songsSlice';
import {
  setError,
  startDbLoading,
  endDbLoading,
} from '@src/state/slice/asyncSlice';
import { fetchTakes } from '@src/data/repositories/TakeRepository';
import * as at from '@src/state/sagas/actionTypes';
import { fetchUserSettings } from '@src/data/repositories/SettingsRepository';
import { fetchSettingsSuccess } from '@src/state/slice/settingsSlice';
import { fetchArtists } from '@src/data/repositories/ArtistsRepository';
import { fetchArtistsSuccess } from '@src/state/slice/artistsSlice';
import { fetchPurchases } from '@src/data/repositories/PurchasesRepository';
import { fetchPurchasesSuccess } from '../slice/purchasesSlice';

function* fetchStartupDataSaga(action: PayloadAction<SQLiteDatabase>) {
  yield put(startDbLoading());
  try {
    const songs: Songs = yield call(fetchSongsWithArtists, action.payload);
    const takes: Takes = yield call(fetchTakes, action.payload);
    const settings: UserSettings = yield call(
      fetchUserSettings,
      action.payload
    );
    const artists: Artists = yield call(fetchArtists, action.payload);
    const purchases: Purchases = yield call(fetchPurchases, action.payload);

    const songsWithTakes = songs.map((song: Song) => ({
      ...song,
      takes: takes.filter((take: Take) => take.songId === song.songId),
    }));

    yield put(fetchSongsWithTakesSuccess(songsWithTakes));
    yield put(fetchSettingsSuccess(settings));
    yield put(fetchArtistsSuccess(artists));
    yield put(fetchPurchasesSuccess(purchases));

    yield put(endDbLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* startupSaga() {
  yield all([takeEvery(at.FETCH_STARTUP_DATA_REQUEST, fetchStartupDataSaga)]);
}
