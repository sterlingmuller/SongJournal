import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { fetchPagePayload, updatePageInfoPayload } from '@src/common/types';
import {
  FETCH_PAGE_REQUEST,
  UPDATE_PAGE_INFO_REQUEST,
} from '@src/sagas/actionTypes';
import {
  fetchPageBySongId,
  updatePageInfo,
} from '@src/repositories/PageRepository';
import { fetchPageFailure, fetchPageSuccess } from '@src/slice/songsSlice';
import { updatePageInfoFailure, updatePageInfoSuccess } from './actionCreators';

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
  yield takeEvery(FETCH_PAGE_REQUEST, fetchPage);
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
  yield takeEvery(UPDATE_PAGE_INFO_REQUEST, updatePageInfoSaga);
}

export default function* pageSaga() {
  yield all([fork(watchFetchPage), fork(watchUpdatePageInfo)]);
}
