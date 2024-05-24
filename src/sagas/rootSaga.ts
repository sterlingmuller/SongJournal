import { all } from 'redux-saga/effects';
import takeSagas from '@src/sagas/takeSaga';

export default function* rootSaga() {
  yield all([takeSagas()]);
}
