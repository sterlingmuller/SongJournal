import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  FetchPagePayload,
  UpdateLyricsPayload,
  UpdatePageInfoPayload,
} from '@src/components/common/types';
import * as at from '@src/state/sagas/actionTypes';
import {
  fetchPageBySongId,
  updateLyrics,
  updatePageInfo,
} from '@src/data/repositories/PageRepository';
import {
  fetchPageSuccess,
  updateLyricsSuccess,
  updatePageInfoSuccess,
} from '@src/state/slice/pagesSlice';
import { updateSongHasLyrics } from '@src/state/slice/songsSlice';
import {
  startLoading,
  setError,
  endLoading,
} from '@src/state/slice/asyncSlice';
import { RootState } from '@src/state/store';

function* fetchPage(action: PayloadAction<FetchPagePayload>) {
  yield put(startLoading());
  try {
    const pageExists = yield select(
      (state: RootState) => action.payload.songId in state.pages.items,
    );

    if (!pageExists) {
      const page = yield call(fetchPageBySongId, action.payload);
      yield put(fetchPageSuccess({ page, songId: action.payload.songId }));
    }
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* updateLyricsSaga(action: PayloadAction<UpdateLyricsPayload>) {
  const { songId, lyrics } = action.payload;
  yield put(startLoading());

  try {
    yield call(updateLyrics, action.payload);

    yield put(updateLyricsSuccess({ songId, lyrics }));
    yield put(updateSongHasLyrics({ songId, lyrics }));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* UpdatePageInfoSaga(action: PayloadAction<UpdatePageInfoPayload>) {
  const { songId, info } = action.payload;

  yield put(startLoading());
  try {
    yield call(updatePageInfo, action.payload);

    if (info) {
      yield put(updatePageInfoSuccess({ songId, info }));
    }

    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* pageSaga() {
  yield all([
    takeEvery(at.FETCH_PAGE_REQUEST, fetchPage),
    takeEvery(at.UPDATE_LYRICS_REQUEST, updateLyricsSaga),
    takeEvery(at.UPDATE_PAGE_INFO_REQUEST, UpdatePageInfoSaga),
  ]);
}
