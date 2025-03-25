import 'dotenv/config';

const IS_DEV = process.env.APP_ENV === 'development';

export default ({ config }) => {
  return {
    ...config,
    name: IS_DEV ? 'SJ (Dev)' : 'Song Journal',
    slug: 'SongJournal',
    scheme: IS_DEV ? 'songjournaldev' : 'songjournal',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './assets/Icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    plugins: [
      ['@react-native-google-signin/google-signin'],
      [
        'expo-secure-store',
        {
          configureAndroidBackup: true,
        },
      ],
      'react-native-cloud-storage',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#ee865b',
          image: './assets/SplashIcon.png',
          dark: {
            image: './assets/SplashIcon.png',
            backgroundColor: '#474240',
          },
          imageWidth: 200,
        },
      ],
    ],
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      infoPlist: {
        UIBackgroundModes: ['audio'],
      },
      bundleIdentifier: IS_DEV
        ? 'com.sterling.silverado.songjournal.dev'
        : 'com.sterling.silverado.songjournal',
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      windowSoftInputMode: 'adjustResize',
      versionCode: 5,
      package: IS_DEV
        ? 'com.sterling.silverado.songjournal.dev'
        : 'com.sterling.silverado.songjournal',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ee865b',
      },
      permissions: ['RECORD_AUDIO', 'WAKE_LOCK', 'FOREGROUND_SERVICE'],
    },
    androidStatusBar: {
      backgroundColor: '#00000000',
      translucent: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '782ab462-3c4f-4302-ae95-e24dfe286e87',
      },
      DROPBOX_CLIENT_ID: process.env.DROPBOX_CLIENT_ID,
      DROPBOX_CLIENT_SECRET: process.env.DROPBOX_CLIENT_SECRET,
    },
    owner: 'sterlo',
    runtimeVersion: '1.0.1',
    updates: {
      url: 'https://u.expo.dev/782ab462-3c4f-4302-ae95-e24dfe286e87',
    },
  };
};
