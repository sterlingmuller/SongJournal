import 'dotenv/config';

const IS_DEV = process.env.APP_ENV === 'development';

export default ({ config }) => {
  return {
    ...config,
    name: IS_DEV ? 'SJ (Dev)' : 'Song Journal',
    slug: 'SongJournal',
    scheme: IS_DEV ? 'songjournaldev' : 'songjournal',
    version: '0.2.0',
    orientation: 'portrait',
    icon: './assets/Icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true,
          },
        },
      ],
      [
        'expo-secure-store',
        {
          configureAndroidBackup: true,
        },
      ],
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
      [
        'react-native-share',
        {
          ios: ['fb', 'instagram', 'twitter', 'tiktoksharesdk'],
          android: [
            'com.facebook.katana',
            'com.instagram.android',
            'com.twitter.android',
            'com.zhiliaoapp.musically',
          ],
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
      softwareKeyboardLayoutMode: 'resize',
      versionCode: 9,
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
      translucent: true,
    },
    extra: {
      eas: {
        projectId: '782ab462-3c4f-4302-ae95-e24dfe286e87',
      },
      DROPBOX_CLIENT_ID: process.env.DROPBOX_CLIENT_ID,
      DROPBOX_CLIENT_SECRET: process.env.DROPBOX_CLIENT_SECRET,
    },
    owner: 'sterlo',
    runtimeVersion: '0.2.0',
    updates: {
      url: 'https://u.expo.dev/782ab462-3c4f-4302-ae95-e24dfe286e87',
    },
  };
};
