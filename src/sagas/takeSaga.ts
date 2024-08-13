import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { createTake, updateTakeNotes } from '@src/repositories/TakeRepository';
import { UpdateTakeNotesSagaPayload, TakePayload } from '@src/common/types';
import {
  CREATE_TAKE_REQUEST,
  UPDATE_TAKE_NOTES_REQUEST,
} from '@src/sagas/actionTypes';
import {
  createTakeFailure,
  createTakeSuccess,
} from '@src/sagas/actionCreators';
import { addTake, updateTakeNotesSuccess } from '@src/slice/songsSlice';

type CreateTakeParams = { payload: TakePayload; type: string };
type UpdateNotesParams = { payload: UpdateTakeNotesSagaPayload; type: string };

function* createTakeSaga({ payload }: CreateTakeParams) {
  try {
    const newTake = yield call(createTake, payload);

    yield put(addTake(newTake));
    yield put(createTakeSuccess(newTake));
  } catch (error) {
    yield put(createTakeFailure(error.message));
  }
}

function* watchCreateTake() {
  yield takeEvery(CREATE_TAKE_REQUEST, createTakeSaga);
}

function* updateTakeNotesSaga({ payload }: UpdateNotesParams) {
  const { db, takeId, songId, notes } = payload;

  try {
    yield call(updateTakeNotes, { db, takeId, notes });

    yield put(updateTakeNotesSuccess({ takeId, songId, notes }));
  } catch (error) {
    yield put(createTakeFailure(error.message));
  }
}

function* watchUpdateTakeNotes() {
  yield takeEvery(UPDATE_TAKE_NOTES_REQUEST, updateTakeNotesSaga);
}

export default function* takeSaga() {
  yield all([fork(watchCreateTake), fork(watchUpdateTakeNotes)]);
}
