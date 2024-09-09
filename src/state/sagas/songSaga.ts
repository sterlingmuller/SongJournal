import { call, put, takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  createSong,
  deleteSong,
  updateSongArtist,
  updateSongCompletion,
  updateSongTitle,
} from '@src/data/repositories/SongsRepository';
import {
  CreateSongPayload,
  DeleteSongPayload,
  UpdateSongArtistSagaPayload,
  UpdateSongCompletionSagaPayload,
  UpdateSongTitleSagaPayload,
} from '@src/components/common/types';
import {
  createSongSuccess,
  removeSongSuccess,
  updateSongArtistSuccess,
  updateSongCompletionSuccess,
  updateSongTitleSuccess,
} from '@src/state/slice/songsSlice';
import {
  startLoading,
  setError,
  endLoading,
} from '@src/state/slice/asyncSlice';
import { setCurrentSongId } from '@src/state/slice/currentSongSlice';
import * as at from '@src/state/sagas/actionTypes';

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

function* deleteSongSaga(action: PayloadAction<DeleteSongPayload>) {
  yield put(startLoading());
  try {
    yield call(deleteSong, action.payload);

    yield put(removeSongSuccess(action.payload.songId));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* updateSongTitleSaga(
  action: PayloadAction<UpdateSongTitleSagaPayload>,
) {
  const { songId, title } = action.payload;
  yield put(startLoading());

  try {
    yield call(updateSongTitle, action.payload);

    yield put(updateSongTitleSuccess({ songId, title }));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* updateSongArtistSaga(
  action: PayloadAction<UpdateSongArtistSagaPayload>,
) {
  const { songId, artistId } = action.payload;
  yield put(startLoading());

  try {
    yield call(updateSongArtist, action.payload);

    yield put(updateSongArtistSuccess({ songId, artistId }));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* updateSongCompletionSaga(
  action: PayloadAction<UpdateSongCompletionSagaPayload>,
) {
  const { songId, completed } = action.payload;
  yield put(startLoading());

  try {
    yield call(updateSongCompletion, action.payload);

    yield put(updateSongCompletionSuccess({ songId, completed }));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* songSaga() {
  yield all([
    takeEvery(at.CREATE_SONG_REQUEST, createSongSaga),
    takeEvery(at.DELETE_SONG_REQUEST, deleteSongSaga),
    takeEvery(at.UPDATE_SONG_TITLE_REQUEST, updateSongTitleSaga),
    takeEvery(at.UPDATE_SONG_ARTIST_REQUEST, updateSongArtistSaga),
    takeEvery(at.UPDATE_SONG_COMPLETION_REQUEST, updateSongCompletionSaga),
  ]);
}
