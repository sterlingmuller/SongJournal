import { configureStore } from '@reduxjs/toolkit';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

import rootReducer from '@src/state/store/rootReducer';
import rootSaga from '@src/state/sagas/rootSaga';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const createSagaMiddleware = require('redux-saga');
const sagaMiddleware = createSagaMiddleware.default();

const store = configureStore({
  reducer: rootReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
