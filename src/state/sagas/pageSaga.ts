import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  FetchPagePayload,
  UpdateLyricsPayload,
  UpdateSongInfoPayload,
} from '@src/components/common/types';
import * as at from '@src/state/sagas/actionTypes';
import {
  fetchPageBySongId,
  updateLyrics,
  updateSongInfo,
} from '@src/data/repositories/PageRepository';
import {
  fetchPageSuccess,
  updateLyrics as updateLyricsAction,
  updatePageInfo as updatePageInfoAction,
} from '@src/state/slice/pagesSlice';
import { updateSongHasLyrics } from '@src/state/slice/songsSlice';
import {
  startLoading,
  setError,
  endLoading,
} from '@src/state/slice/asyncSlice';
import { RootState } from '@src/state/store';
import { updateSongCompletion as UpdateSongCompletionAction } from '@src/state/slice/songsSlice';

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

    yield put(updateLyricsAction({ songId, lyrics }));
    yield put(updateSongHasLyrics({ songId, lyrics }));
    yield put(endLoading());
  } catch (error) {
    yield put(setError(error));
  }
}

function* UpdateSongInfoSaga(action: PayloadAction<UpdateSongInfoPayload>) {
  const { songId, info, completed } = action.payload;

  yield put(startLoading());
  try {
    yield call(updateSongInfo, action.payload);

    if (info) {
      yield put(updatePageInfoAction({ songId, info }));
    }

    if (completed !== undefined) {
      yield put(UpdateSongCompletionAction({ songId, completed }));
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
    takeEvery(at.UPDATE_PAGE_INFO_REQUEST, UpdateSongInfoSaga),
  ]);
}
