import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { createTake } from '@src/repositories/TakeRepository';
import { addTake } from '@src/slice/currentSongSlice';
import { createTakeRequest, createTakeSuccess } from '@src/slice/takeSlice';
import { takePayload } from '@src/common/types';
import { CREATE_TAKE_REQUEST } from '@src/sagas/actionTypes';

function* createTakeSaga(action: { payload: takePayload }) {
  try {
    yield put(createTakeRequest());
    const newTake = yield call(createTake, action.payload);
    yield put(addTake(newTake));
    yield put(createTakeSuccess());
  } catch (error) {
    console.error('Error creating take', error);
  }
}

function* watchCreateTake() {
  yield takeEvery(CREATE_TAKE_REQUEST, createTakeSaga);
}

export default function* takeSaga() {
  yield all([fork(watchCreateTake)]);
}
