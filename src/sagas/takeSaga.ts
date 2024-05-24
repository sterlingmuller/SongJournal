import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { createTake } from '@src/repositories/TakeRepository';
import { incrementTotalTakes } from '@src/slice/currentSongSlice';
import { createTakeRequest, createTakeSuccess } from '@src/slice/takeSlice';
import { takePayload } from '@src/common/types';

function* createTakeSaga(action: { payload: takePayload }) {
  try {
    yield put(createTakeRequest());
    const newTake = yield call(createTake, action.payload);
    yield put(incrementTotalTakes());
    yield put(createTakeSuccess());
  } catch (error) {
    console.error('Error creating take', error);
  }
}

function* watchCreateTake() {
  yield takeEvery('CREATE_TAKE', createTakeSaga);
}

export default function* takeSagas() {
  yield all([fork(watchCreateTake)]);
}
