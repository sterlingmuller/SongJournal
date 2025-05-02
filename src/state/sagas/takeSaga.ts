import { call, put, takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  updateTakeNotes,
  deleteTake,
} from '@src/data/repositories/TakeRepository';
import {
  UpdateTakeNotesSagaPayload,
  DeleteTakeSagaPayload,
} from '@src/components/common/types';
import {
  removeTakeSuccess,
  updateTakeNotesSuccess,
} from '@src/state/slice/songsSlice';
import {
  startLoading,
  setError,
  endLoading,
} from '@src/state/slice/asyncSlice';
import * as at from '@src/state/sagas/actionTypes';

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

export default function* songSaga() {
  yield all([
    takeEvery(at.DELETE_TAKE_REQUEST, deleteTakeSaga),
    takeEvery(at.UPDATE_TAKE_NOTES_REQUEST, updateTakeNotesSaga),
  ]);
}
