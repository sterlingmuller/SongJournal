import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchArtists,
  addArtist,
  updateArtist,
  deleteArtist,
} from '@src/data/repositories/ArtistsRepository';
import {
  addArtistSuccess,
  fetchArtistsSuccess,
  updateArtistSuccess,
  removeArtistSuccess,
} from '@src/state/slice/artistsSlice';
import {
  startLoading,
  setError,
  endLoading,
} from '@src/state/slice/asyncSlice';
import { SQLiteDatabase } from 'expo-sqlite';
import {
  AddArtistDbPayload,
  DeleteArtistDbPayload,
  UpdateArtistDbPayload,
} from '@src/components/common/types';
import * as at from '@src/state/sagas/actionTypes';

function* fetchArtistsSaga(action: PayloadAction<SQLiteDatabase>) {
  yield put(startLoading());
  try {
    const artists = yield call(fetchArtists, action.payload);

    yield put(fetchArtistsSuccess(artists));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* addArtistSaga(action: PayloadAction<AddArtistDbPayload>) {
  const { db, name } = action.payload;
  yield put(startLoading());
  try {
    const newArtist = yield call(addArtist, { db, name });

    yield put(addArtistSuccess(newArtist));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* updateArtistSaga(action: PayloadAction<UpdateArtistDbPayload>) {
  yield put(startLoading());
  try {
    const updatedArtist = yield call(updateArtist, action.payload);
    yield put(updateArtistSuccess(updatedArtist));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* deleteArtistSaga(action: PayloadAction<DeleteArtistDbPayload>) {
  yield put(startLoading());
  try {
    yield call(deleteArtist, action.payload);
    yield put(removeArtistSuccess(action.payload.artistId));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* artistsSaga() {
  yield takeLatest(at.FETCH_ARTISTS_REQUEST, fetchArtistsSaga);
  yield takeLatest(at.ADD_ARTIST_REQUEST, addArtistSaga);
  yield takeLatest(at.UPDATE_ARTIST_REQUEST, updateArtistSaga);
  yield takeLatest(at.DELETE_ARTIST_REQUEST, deleteArtistSaga);
}
