import { call, put, takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SQLiteDatabase } from 'expo-sqlite';

import { fetchSongs } from '@src/repositories/SongsRepository';
import { Song, Songs, Take, Takes } from '@src/common/types';
import { fetchSongsWithTakesSuccess } from '@src/slice/songsSlice';
import { startLoading, setError, endLoading } from '@src/slice/asyncSlice';
import { fetchTakes } from '@src/repositories/TakeRepository';
import * as at from '@src/sagas/actionTypes';

function* fetchSongsWithTakesSaga(action: PayloadAction<SQLiteDatabase>) {
  yield put(startLoading());
  try {
    const songs: Songs = yield call(fetchSongs, action.payload);
    const takes: Takes = yield call(fetchTakes, action.payload);

    const songsWithTakes = songs.map((song: Song) => ({
      ...song,
      takes: takes.filter((take: Take) => take.songId === song.songId),
    }));

    yield put(fetchSongsWithTakesSuccess(songsWithTakes));
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
