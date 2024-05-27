import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { fetchTakes } from '@src/repositories/TakeRepository';
import { song, take } from '@src/common/types';
import {
  fetchSongsWithTakesFailure,
  fetchSongsWithTakesSuccess,
} from '@src/sagas/actionCreators';
import { fetchSongs } from '@src/repositories/SongsRepository';
import { SQLiteDatabase } from 'expo-sqlite';
import { FETCH_SONGS_WITH_TAKES_REQUEST } from './actionTypes';

type Params = { meta: SQLiteDatabase; type: string };

function* fetchSongsWithTakes({ meta: db }: Params) {
  try {
    const songs: song[] = yield call(fetchSongs, db);
    const takes: take[] = yield call(fetchTakes, db);
    const songsWithTakes = songs.map((song: song) => ({
      ...song,
      takes: takes.filter((take: take) => take.songId === song.songId),
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
