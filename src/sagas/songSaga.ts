import { call, put, takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { createSong, deleteSong } from '@src/repositories/SongsRepository';
import { CreateSongPayload, DeleteSongPayload } from '@src/common/types';
import { createSongSuccess, removeSongSuccess } from '@src/slice/songsSlice';
import { startLoading, setError, endLoading } from '@src/slice/asyncSlice';
import { setCurrentSongId } from '@src/slice/currentSongSlice';
import * as at from '@src/sagas/actionTypes';

function* createSongSaga(action: PayloadAction<CreateSongPayload>) {
  yield put(startLoading());
  try {
    const newSong = yield call(createSong, action.payload);

    yield put(setCurrentSongId(newSong.songId));
    yield put(createSongSuccess(newSong));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* DeleteSongSaga(action: PayloadAction<DeleteSongPayload>) {
  yield put(startLoading());
  try {
    yield call(deleteSong, action.payload);

    yield put(removeSongSuccess(action.payload.songId));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* songSaga() {
  yield all([
    takeEvery(at.CREATE_SONG_REQUEST, createSongSaga),
    takeEvery(at.DELETE_SONG_REQUEST, DeleteSongSaga),
  ]);
}
