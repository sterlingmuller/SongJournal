import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
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
import {
  fetchPageRequest,
  fetchPageSuccess,
  fetchPageFailure,
  updateLyricsRequest,
  updateLyricsSuccess,
  updateLyricsFailure,
  updatePageInfoRequest,
  updatePageInfoSuccess,
  updatePageInfoFailure,
} from '@src/slice/pagesSlice';
import { RootState } from '@src/store';

function* fetchPage(action: PayloadAction<FetchPagePayload>) {
  yield put(fetchPageRequest());
  const pageExists = yield select(
    (state: RootState) => action.payload.songId in state.pages.items,
  );

  if (!pageExists) {
    try {
      const page = yield call(fetchPageBySongId, action.payload);
      yield put(fetchPageSuccess({ page, songId: action.payload.songId }));
    } catch (error) {
      yield put(fetchPageFailure(error));
    }
  }
}

function* updateLyricsSaga(action: PayloadAction<UpdateLyricsPayload>) {
  yield put(updateLyricsRequest());
  try {
    yield call(updateLyrics, action.payload);
    yield put(updateLyricsSuccess(action.payload));
  } catch (error) {
    yield put(updateLyricsFailure(error));
  }
}

function* updatePageInfoSaga(action: PayloadAction<UpdatePageInfoPayload>) {
  yield put(updatePageInfoRequest());
  try {
    yield call(updatePageInfo, action.payload);
    yield put(updatePageInfoSuccess(action.payload));
  } catch (error) {
    yield put(updatePageInfoFailure(error));
  }
}

export default function* pageSaga() {
  yield all([
    takeEvery(at.FETCH_PAGE_REQUEST, fetchPage),
    takeEvery(at.UPDATE_LYRICS_REQUEST, updateLyricsSaga),
    takeEvery(at.UPDATE_PAGE_INFO_REQUEST, updatePageInfoSaga),
  ]);
}
