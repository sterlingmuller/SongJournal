import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { fetchPagePayload } from '@src/common/types';
import { FETCH_PAGE_REQUEST } from '@src/sagas/actionTypes';
import { fetchPageBySongId } from '@src/repositories/PageRepository';
import { fetchPageFailure, fetchPageSuccess } from '@src/slice/songsSlice';

type FetchPageParams = { payload: fetchPagePayload; type: string };

function* fetchPage({ payload }: FetchPageParams) {
  try {
    console.log('hrm');
    const page = yield call(fetchPageBySongId, payload);

    console.log('page in fetch saga:', page);

    yield put(fetchPageSuccess({ page, songId: payload.songId }));
  } catch (error) {
    yield put(fetchPageFailure(error.message));
  }
}

function* watchFetchPage() {
  yield takeEvery(FETCH_PAGE_REQUEST, fetchPage);
}

export default function* pageSaga() {
  yield all([fork(watchFetchPage)]);
}
