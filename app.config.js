import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    name: 'SongJournal',
    slug: 'SongJournal',
    scheme: 'songjournal',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './assets/Icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    plugins: [
      ['@react-native-google-signin/google-signin'],
      [
        'expo-secure-store',
        {
          configureAndroidBackup: true,
        },
      ],
      'react-native-cloud-storage',
    ],
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      infoPlist: {
        UIBackgroundModes: ['audio'],
      },
      bundleIdentifier: 'com.sterling.silverado.songjournal',
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      windowSoftInputMode: 'adjustResize',
      versionCode: 4,
      package: 'com.sterling.silverado.songjournal',
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
      dropboxClientId: process.env.DROPBOX_CLIENT_ID,
      dropboxClientSecret: process.env.DROPBOX_CLIENT_SECRET,
    },
    owner: 'sterlo',
    runtimeVersion: '1.0.1',
    updates: {
      url: 'https://u.expo.dev/782ab462-3c4f-4302-ae95-e24dfe286e87',
    },
  };
};
