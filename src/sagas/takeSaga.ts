import { call, put, takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  createTake,
  updateTakeNotes,
  deleteTake,
} from '@src/repositories/TakeRepository';
import {
  TakePayload,
  UpdateTakeNotesSagaPayload,
  DeleteTakeSagaPayload,
  UpdateSelectedTakeIdPayloadDb,
} from '@src/common/types';
import {
  removeTakeSuccess,
  updateTakeNotesSuccess,
  createTakeSuccess,
  updateSelectedTakeIdSuccess,
} from '@src/slice/songsSlice';
import { startLoading, setError, endLoading } from '@src/slice/asyncSlice';
import * as at from '@src/sagas/actionTypes';
import { updateSelectedTakeId } from '@src/repositories/SongsRepository';

function* deleteTakeSaga(action: PayloadAction<DeleteTakeSagaPayload>) {
  const { db, takeId, songId } = action.payload;

  yield put(startLoading());
  try {
    yield call(deleteTake, { db, takeId });

    yield put(removeTakeSuccess({ takeId, songId }));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* updateTakeNotesSaga(
  action: PayloadAction<UpdateTakeNotesSagaPayload>,
) {
  const { db, takeId, songId, notes } = action.payload;
  yield put(startLoading());
  try {
    yield call(updateTakeNotes, { db, takeId, notes });

    yield put(updateTakeNotesSuccess({ takeId, songId, notes }));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* createTakeSaga(action: PayloadAction<TakePayload>) {
  yield put(startLoading());
  try {
    const newTake = yield call(createTake, action.payload);

    yield put(createTakeSuccess(newTake));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* updateSelectedTakeIdSaga(
  action: PayloadAction<UpdateSelectedTakeIdPayloadDb>,
) {
  yield put(startLoading());
  try {
    yield call(updateSelectedTakeId, action.payload);

    yield put(updateSelectedTakeIdSuccess(action.payload));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* songSaga() {
  yield all([
    takeEvery(at.DELETE_TAKE_REQUEST, deleteTakeSaga),
    takeEvery(at.UPDATE_TAKE_NOTES_REQUEST, updateTakeNotesSaga),
    takeEvery(at.CREATE_TAKE_REQUEST, createTakeSaga),
    takeEvery(at.UPDATE_SELECTED_TAKE_ID_REQUEST, updateSelectedTakeIdSaga),
  ]);
}
