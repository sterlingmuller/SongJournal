import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-expo-dev-plugin';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '@src/state/store/rootReducer';
import rootSaga from '@src/state/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: composeWithDevTools(),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
