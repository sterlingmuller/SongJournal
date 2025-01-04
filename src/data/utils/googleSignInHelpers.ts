import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { storeRefreshToken } from '@src/data/utils/tokenStorage';

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const tokens = await GoogleSignin.getTokens();
    await storeRefreshToken(tokens.accessToken);

    return { tokens, userInfo };
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};
