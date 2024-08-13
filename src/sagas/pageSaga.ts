import { call, put, takeEvery, all, fork, select } from 'redux-saga/effects';

import {
  FetchPagePayload,
  UpdateLyricsPayload,
  UpdatePageInfoPayload,
} from '@src/common/types';
import * as at from '@src/sagas/actionTypes';
import {
  fetchPageBySongId,
  updateLyrics,
  updatePageInfo,
} from '@src/repositories/PageRepository';
import { fetchPageFailure, fetchPageSuccess } from '@src/slice/pagesSlice';
import {
  updateLyricsSuccess,
  updatePageInfoFailure,
  updatePageInfoSuccess,
} from './actionCreators';
import { RootState } from '@src/store';

type FetchPageParams = { payload: FetchPagePayload; type: string };

function* fetchPage({ payload }: FetchPageParams) {
  const pageExists = yield select(
    (state: RootState) => !!state.pages.items[payload.songId],
  );

  if (!pageExists) {
    try {
      const page = yield call(fetchPageBySongId, payload);

      yield put(fetchPageSuccess({ page, songId: payload.songId }));
    } catch (error) {
      yield put(fetchPageFailure(error.message));
    }
  }
}

function* watchFetchPage() {
  yield takeEvery(at.FETCH_PAGE_REQUEST, fetchPage);
}

type UpdatePageInfoParams = { payload: UpdatePageInfoPayload; type: string };

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

type UpdateLyricsParams = { payload: UpdateLyricsPayload; type: string };

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
