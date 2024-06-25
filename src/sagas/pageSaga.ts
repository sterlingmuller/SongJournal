import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import {
  fetchPagePayload,
  page,
  updateLyricsPayload,
  updatePageInfoPayload,
} from '@src/common/types';
import * as at from '@src/sagas/actionTypes';
import {
  fetchPageBySongId,
  updateLyrics,
  updatePageInfo,
} from '@src/repositories/PageRepository';
import { fetchPageFailure, fetchPageSuccess } from '@src/slice/songsSlice';
import {
  updateLyricsSuccess,
  updatePageInfoFailure,
  updatePageInfoSuccess,
} from './actionCreators';

type FetchPageParams = { payload: fetchPagePayload; type: string };

function* fetchPage({ payload }: FetchPageParams) {
  try {
    const page = yield call(fetchPageBySongId, payload);

    const formattedPage: page = {
      lyrics: page.lyrics,
      info: {
        bpm: page.bpm,
        keySignature: page.keySignature,
        time: page.time,
        about: page.about,
        completed: !!page.completed,
      },
    };

    yield put(
      fetchPageSuccess({ page: formattedPage, songId: payload.songId }),
    );
  } catch (error) {
    yield put(fetchPageFailure(error.message));
  }
}

function* watchFetchPage() {
  yield takeEvery(at.FETCH_PAGE_REQUEST, fetchPage);
}

type UpdatePageInfoParams = { payload: updatePageInfoPayload; type: string };

function* updatePageInfoSaga({ payload }: UpdatePageInfoParams) {
  const { songId, info } = payload;

  try {
    yield call(updatePageInfo, payload);

    yield put(updatePageInfoSuccess({ info, songId }));
  } catch (error) {
    yield put(updatePageInfoFailure(error));
  }
}

function* watchUpdatePageInfo() {
  yield takeEvery(at.UPDATE_PAGE_INFO_REQUEST, updatePageInfoSaga);
}

type UpdateLyricsParams = { payload: updateLyricsPayload; type: string };

function* updateLyricsSaga({ payload }: UpdateLyricsParams) {
  const { songId, lyrics } = payload;

  try {
    yield call(updateLyrics, payload);

    yield put(updateLyricsSuccess({ songId, lyrics }));
  } catch (error) {
    yield put(updatePageInfoFailure(error));
  }
}

function* watchUpdateLyrics() {
  yield takeEvery(at.UPDATE_LYRICS_REQUEST, updateLyricsSaga);
}

export default function* pageSaga() {
  yield all([
    fork(watchFetchPage),
    fork(watchUpdatePageInfo),
    fork(watchUpdateLyrics),
  ]);
}
