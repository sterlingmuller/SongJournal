import { all } from 'redux-saga/effects';

import startupSaga from '@src/sagas/startupSaga';
import takeSagas from '@src/sagas/takeSaga';
import songSaga from '@src/sagas/songSaga';
import pageSaga from '@src/sagas/pageSaga';

export default function* rootSaga() {
  yield all([startupSaga(), songSaga(), takeSagas(), pageSaga()]);
}
