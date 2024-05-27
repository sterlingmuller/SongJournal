import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { createTake } from '@src/repositories/TakeRepository';
import { takePayload } from '@src/common/types';
import { CREATE_TAKE_REQUEST } from '@src/sagas/actionTypes';
import {
  createTakeFailure,
  createTakeSuccess,
} from '@src/sagas/actionCreators';
import { addTake } from '@src/slice/songsSlice';

type Params = { payload: takePayload; type: string };

function* createTakeSaga({ payload }: Params) {
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

export default function* takeSaga() {
  yield all([fork(watchCreateTake)]);
}
