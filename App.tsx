import React, {
  StrictMode,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { StatusBar, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';

import AppNavigator from '@src/navigation/AppNavigator';
import {
  ColorThemeProvider,
  useColorTheme,
} from '@src/state/context/ThemeContext';
import { NetworkProvider } from '@src/state/context/NetworkContext';
import store from '@src/state/store/index';
import { migrateDbIfNeeded } from '@src/data/database/db';
import { DB_NAME, SCREEN_HEIGHT } from '@src/components/common/constants';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectIsDbLoading } from '@src/state/selectors/asyncSelectors';
import { fetchStartupDataRequest } from '@src/state/sagas/actionCreators';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

const Main = () => {
  const { isThemeLoading, theme } = useColorTheme();
  const isDbLoading = useAppSelector(selectIsDbLoading);
  const [isAppReady, setIsAppReady] = useState(false);

  const db = useSQLiteContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStartupDataRequest(db));
  }, [dispatch, db]);

  useEffect(() => {
    if (!isThemeLoading && !isDbLoading) {
      setTimeout(() => {
        setIsAppReady(true);
      }, 100);
    }
  }, [isThemeLoading, isDbLoading]);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await NavigationBar.setPositionAsync('absolute');
      await NavigationBar.setBackgroundColorAsync(theme.primary);
      SplashScreen.hide();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: SCREEN_HEIGHT * 0.03,
        backgroundColor: theme.primary,
      }}
      onLayout={onLayoutRootView}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <AppNavigator />
    </View>
  );
};

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);

  const handleDbInit = async (db: SQLiteDatabase) => {
    await migrateDbIfNeeded(db);
    setDbInitialized(true);
  };

  return (
    <StrictMode>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Suspense fallback={null}>
          <SQLiteProvider
            databaseName={DB_NAME}
            onInit={handleDbInit}
            useSuspense
          >
            <ColorThemeProvider>
              <Provider store={store}>
                <NetworkProvider>{dbInitialized && <Main />}</NetworkProvider>
              </Provider>
            </ColorThemeProvider>
          </SQLiteProvider>
        </Suspense>
      </GestureHandlerRootView>
    </StrictMode>
  );
};

export default App;
