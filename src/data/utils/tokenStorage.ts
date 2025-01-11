import * as SecureStore from 'expo-secure-store';

const REFRESH_TOKEN_KEY = 'refresh_token';
const ACCESS_TOKEN_KEY = 'access_token';

interface AccessTokenData {
  token: string;
  expiry: number;
}

export const storeRefreshToken = async (refreshToken: string) => {
  try {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.error('Failed to store refresh token', error);
  }
};

export const storeAccessToken = async (
  accessToken: string,
  expiresIn: number,
) => {
  try {
    const accessTokenData: AccessTokenData = {
      token: accessToken,
      expiry: Date.now() + expiresIn * 1000,
    };
    await SecureStore.setItemAsync(
      ACCESS_TOKEN_KEY,
      JSON.stringify(accessTokenData),
    );
  } catch (error) {
    console.error('Failed to store access token', error);
  }
};

export const getAccessToken = async () => {
  try {
    const accessTokenData = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (accessTokenData) {
      const { token } = JSON.parse(accessTokenData) as AccessTokenData;
      return token;
    }
    return null;
  } catch (error) {
    console.error('Failed to get access token', error);
  }
};

export const getAccessTokenExpiry = async () => {
  try {
    const accessTokenData = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (accessTokenData) {
      const { expiry } = JSON.parse(accessTokenData) as AccessTokenData;
      return expiry;
    }
    return null;
  } catch (error) {
    console.error('Failed to get access token expiry', error);
  }
};

export const getRefreshToken = async () => {
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get refresh token', error);
  }
};

export const clearRefreshToken = async () => {
  try {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to clear refresh token', error);
  }
};

export const clearTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};
