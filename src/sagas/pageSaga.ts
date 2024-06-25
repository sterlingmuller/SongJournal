import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import {
  fetchPagePayload,
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

    yield put(fetchPageSuccess({ page, songId: payload.songId }));
  } catch (error) {
    yield put(fetchPageFailure(error.message));
  }
}

function* watchFetchPage() {
  yield takeEvery(at.FETCH_PAGE_REQUEST, fetchPage);
}

type UpdatePageInfoParams = { payload: updatePageInfoPayload; type: string };

function* updatePageInfoSaga({ payload }: UpdatePageInfoParams) {
  try {
    const updatedPage = yield call(updatePageInfo, payload);

    console.log('updatedPage', updatedPage);

    yield put(
      updatePageInfoSuccess({ page: updatedPage, songId: payload.songId }),
    );
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
