import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import {
  CreateSongPayload,
  UpdateSelectedTakeIdPayloadDb,
} from '@src/common/types';
import {
  CREATE_SONG_REQUEST,
  UPDATE_SELECTED_TAKE_ID_REQUEST,
} from '@src/sagas/actionTypes';
import {
  createSongFailure,
  createSongSuccess,
  updateSelectedTakeIdFailure,
  updateSelectedTakeIdSuccess,
} from '@src/sagas/actionCreators';
import {
  createSong,
  updateSelectedTakeId,
} from '@src/repositories/SongsRepository';
import { setCurrentSongId } from '@src/slice/currentSongSlice';

type CreateSongParams = { payload: CreateSongPayload; type: string };
type UpdateSelectedTakeParams = {
  payload: UpdateSelectedTakeIdPayloadDb;
  type: string;
};

function* createSongSaga({ payload }: CreateSongParams) {
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

function* updateSelectedTakeIdSaga({ payload }: UpdateSelectedTakeParams) {
  const { songId, takeId } = payload;

  try {
    yield call(updateSelectedTakeId, payload);
    yield put(updateSelectedTakeIdSuccess({ songId, takeId }));
  } catch (error) {
    yield put(updateSelectedTakeIdFailure(error.message));
  }
}

function* watchUpdateSelectedTakeId() {
  yield takeEvery(UPDATE_SELECTED_TAKE_ID_REQUEST, updateSelectedTakeIdSaga);
}

export default function* songSaga() {
  yield all([fork(watchCreateSong), fork(watchUpdateSelectedTakeId)]);
}
