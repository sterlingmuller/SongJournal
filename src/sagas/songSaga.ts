import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { createSongPayload } from '@src/common/types';
import { CREATE_SONG_REQUEST } from '@src/sagas/actionTypes';
import {
  createSongFailure,
  createSongSuccess,
} from '@src/sagas/actionCreators';
import { createSong } from '@src/repositories/SongsRepository';
import { setCurrentSongId } from '@src/slice/currentSongSlice';

type Params = { payload: createSongPayload; type: string };

function* createSongSaga({ payload }: Params) {
  try {
    const newSong = yield call(createSong, payload);

    yield put(setCurrentSongId(newSong.songId));
    yield put(createSongSuccess(newSong));
  } catch (error) {
    yield put(createSongFailure(error.message));
  }
}

function* watchCreateSong() {
  yield takeEvery(CREATE_SONG_REQUEST, createSongSaga);
}

export default function* songSaga() {
  yield all([fork(watchCreateSong)]);
}
