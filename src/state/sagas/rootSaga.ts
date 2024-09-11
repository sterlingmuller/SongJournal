import { all } from 'redux-saga/effects';

import startupSaga from '@src/state/sagas/startupSaga';
import takeSagas from '@src/state/sagas/takeSaga';
import songSaga from '@src/state/sagas/songSaga';
import pageSaga from '@src/state/sagas/pageSaga';
import artistsSaga from '@src/state/sagas/artistsSaga';
import settingsSaga from '@src/state/sagas/settingsSaga';
import purchasesSaga from '@src/state/sagas/purchasesSaga';

export default function* rootSaga() {
  yield all([
    startupSaga(),
    songSaga(),
    takeSagas(),
    pageSaga(),
    artistsSaga(),
    settingsSaga(),
    purchasesSaga(),
  ]);
}
