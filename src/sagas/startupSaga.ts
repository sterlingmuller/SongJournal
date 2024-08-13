import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { SQLiteDatabase } from 'expo-sqlite';

import { fetchTakes } from '@src/repositories/TakeRepository';
import { Song, Songs, Take, Takes } from '@src/common/types';
import {
  fetchSongsWithTakesFailure,
  fetchSongsWithTakesSuccess,
} from '@src/sagas/actionCreators';
import { fetchSongs } from '@src/repositories/SongsRepository';
import { FETCH_SONGS_WITH_TAKES_REQUEST } from '@src/sagas/actionTypes';

type Params = { payload: SQLiteDatabase; type: string };

function* fetchSongsWithTakes({ payload: db }: Params) {
  try {
    const songs: Songs = yield call(fetchSongs, db);
    const takes: Takes = yield call(fetchTakes, db);

    const songsWithTakes = songs.map((song: Song) => ({
      ...song,
      takes: takes.filter((take: Take) => take.songId === song.songId),
    }));

    yield put(fetchSongsWithTakesSuccess(songsWithTakes));
  } catch (error) {
    yield put(fetchSongsWithTakesFailure(error.message));
  }
}

function* watchFetchSongsAndTakes() {
  yield takeEvery(FETCH_SONGS_WITH_TAKES_REQUEST, fetchSongsWithTakes);
}

export default function* startupSaga() {
  yield all([fork(watchFetchSongsAndTakes)]);
}
