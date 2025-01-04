import { useEffect, useState } from 'react';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import { storeAccessToken } from '@src/data/utils/tokenStorage';
import { generateChallange } from '@src/data/utils/pkceVerifier';

const exchangeCodeForToken = async (code: string, codeVerifier: string) => {
  const tokenEndpoint = 'https://api.dropboxapi.com/oauth2/token';
  const clientId = 'qehgg4lala5ryh6';
  const clientSecret = 'iusw57fe5ezmwa6';
  const redirectUri = makeRedirectUri({
    scheme: 'songjournal',
    path: 'authConfirmation',
  });

  const params = new URLSearchParams();
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('redirect_uri', redirectUri);
  params.append('code_verifier', codeVerifier);

  try {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();
    if (response.ok) {
      storeAccessToken(data.access_token);
    } else {
      console.error('Error exchanging code for token:', data);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

const DropboxAuth = () => {
  const [codeVerifier, setCodeVerifier] = useState('');
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'qehgg4lala5ryh6',
      scopes: [],
      redirectUri: makeRedirectUri({
        scheme: 'songjournal',
        path: 'authConfirmation',
      }),
    },
    {
      authorizationEndpoint: 'https://www.dropbox.com/oauth2/authorize',
      tokenEndpoint: 'https://api.dropboxapi.com/oauth2/token',
    },
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const authCode = response.params.code;
      console.log('response:', response);
      exchangeCodeForToken(authCode, codeVerifier);
    }
  }, [response]);

  const handlePress = async () => {
    const { codeVerifier, codeChallenge } = await generateChallange();
    setCodeVerifier(codeVerifier);

    const authUrl = `${request.url}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    promptAsync({
      url: authUrl,
    });
  };

  return (
    <Button
      disabled={!request}
      title="Connect to Dropbox"
      onPress={handlePress}
    />
  );
};

export default DropboxAuth;
