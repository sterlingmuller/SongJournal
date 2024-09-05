import { call, put, takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SQLiteDatabase } from 'expo-sqlite';

import { fetchSongsWithArtists } from '@src/data/repositories/SongsRepository';
import {
  Artists,
  Song,
  Songs,
  Take,
  Takes,
  UserSettings,
} from '@src/components/common/types';
import { fetchSongsWithTakesSuccess } from '@src/state/slice/songsSlice';
import {
  startLoading,
  setError,
  endLoading,
} from '@src/state/slice/asyncSlice';
import { fetchTakes } from '@src/data/repositories/TakeRepository';
import * as at from '@src/state/sagas/actionTypes';
import { fetchUserSettings } from '@src/data/repositories/SettingsRepository';
import { fetchSettingsSuccess } from '@src/state/slice/settingsSlice';
import { fetchArtists } from '@src/data/repositories/ArtistsRepository';
import { fetchArtistsSuccess } from '@src/state/slice/artistsSlice';

function* fetchSongsWithTakesSaga(action: PayloadAction<SQLiteDatabase>) {
  yield put(startLoading());
  try {
    const songs: Songs = yield call(fetchSongsWithArtists, action.payload);
    const takes: Takes = yield call(fetchTakes, action.payload);
    const settings: UserSettings = yield call(
      fetchUserSettings,
      action.payload,
    );
    const artists: Artists = yield call(fetchArtists, action.payload);

    const songsWithTakes = songs.map((song: Song) => ({
      ...song,
      takes: takes.filter((take: Take) => take.songId === song.songId),
    }));

    yield put(fetchSongsWithTakesSuccess(songsWithTakes));
    yield put(fetchSettingsSuccess(settings));
    yield put(fetchArtistsSuccess(artists));

    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* startupSaga() {
  yield all([
    takeEvery(at.FETCH_SONGS_WITH_TAKES_REQUEST, fetchSongsWithTakesSaga),
  ]);
}
