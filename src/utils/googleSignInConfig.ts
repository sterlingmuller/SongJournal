import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '667587402306-uc2610nddbofn6d4jmmqdctk6sjn2tfr.apps.googleusercontent.com',
    offlineAccess: true, // this requests a refresh token to obtain new access token when current access token expires. I will need to store this refresh token in my local db and use it to get a new access token when the current one expires by calling GoogleSignin.refreshPlayServices() and GoogleSignin.getTokens().
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file'],
  });
};
