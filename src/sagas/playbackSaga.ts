import { watch } from 'fs';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

function* stopTrackSaga() {
  const sound: Audio.Sound | null = yield select(
    (state) => state.playback.sound,
  );
  if (sound) {
    yield call([sound, sound.unloadAsync]);
  }
  yield put(stopTrack());
}

function* watchStopTrack() {
  yield takeEvery(STOP_TRACK_REQUEST, stopTrackSaga);
}

export default function* playbackSaga() {
  yield all([fork(watchStopTrack)]);
}

// this is copy pasted, have a lot of set up to do
