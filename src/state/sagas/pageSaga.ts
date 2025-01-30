import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { FetchPagePayload } from '@src/components/common/types';
import * as at from '@src/state/sagas/actionTypes';
import { fetchPageBySongId } from '@src/data/repositories/PageRepository';
import { fetchPageSuccess } from '@src/state/slice/pagesSlice';
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

export default function* pageSaga() {
  yield all([takeEvery(at.FETCH_PAGE_REQUEST, fetchPage)]);
}
