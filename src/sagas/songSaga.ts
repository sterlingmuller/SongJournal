import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  CreateSongPayload,
  UpdateSelectedTakeIdPayloadDb,
} from '@src/common/types';
import {
  CREATE_SONG_REQUEST,
  UPDATE_SELECTED_TAKE_ID_REQUEST,
} from '@src/sagas/actionTypes';
import {
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSelectedTakeIdRequest,
  updateSelectedTakeIdSuccess,
  updateSelectedTakeIdFailure,
} from '@src/slice/songsSlice';
import {
  createSong,
  updateSelectedTakeId,
} from '@src/repositories/SongsRepository';
import { setCurrentSongId } from '@src/slice/currentSongSlice';

function* createSongSaga(action: PayloadAction<CreateSongPayload>) {
  yield put(createSongRequest());
  try {
    const newSong = yield call(createSong, action.payload);
    yield put(setCurrentSongId(newSong.songId));
    yield put(createSongSuccess(newSong));
  } catch (error) {
    yield put(createSongFailure(error));
  }
}

function* watchCreateSong() {
  yield takeEvery(CREATE_SONG_REQUEST, createSongSaga);
}

function* updateSelectedTakeIdSaga(
  action: PayloadAction<UpdateSelectedTakeIdPayloadDb>,
) {
  yield put(updateSelectedTakeIdRequest());
  const { songId, takeId } = action.payload;
  try {
    yield call(updateSelectedTakeId, action.payload);
    yield put(updateSelectedTakeIdSuccess({ songId, takeId }));
  } catch (error) {
    yield put(updateSelectedTakeIdFailure(error));
  }
}

function* watchUpdateSelectedTakeId() {
  yield takeEvery(UPDATE_SELECTED_TAKE_ID_REQUEST, updateSelectedTakeIdSaga);
}

export default function* songSaga() {
  yield all([fork(watchCreateSong), fork(watchUpdateSelectedTakeId)]);
}
