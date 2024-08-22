import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-expo-dev-plugin';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '@src/state/store/rootReducer';
import rootSaga from '@src/state/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
