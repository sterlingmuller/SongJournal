import * as Crypto from 'expo-crypto';
import { Buffer } from 'buffer';

const URLEncode = (str: string) =>
  str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

const sha256 = async (buffer: string): Promise<string> =>
  await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, buffer, {
    encoding: Crypto.CryptoEncoding.BASE64,
  });

const generateShortUUID = () => Math.random().toString(36).substring(2, 15);

export const generateChallange = async () => {
  const state = generateShortUUID();
  const randomBytes = await Crypto.getRandomBytesAsync(32);
  const base64String = Buffer.from(randomBytes).toString('base64');
  const codeVerifier = URLEncode(base64String);
  const codeChallenge = URLEncode(await sha256(codeVerifier));

  return { codeVerifier, codeChallenge, state };
};
