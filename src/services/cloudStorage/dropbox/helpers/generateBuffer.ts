import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

export const generateBuffer = async (uri: string) => {
  const content = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const buffer = Buffer.from(content, 'base64');

  return buffer;
};

// export const generateLyricsBuffer = async (
//   page: Page,
//   songTitle: string,
//   artistId: number,
// ) => {
//   const { getArtistName } = useArtistName();

//   const artist = getArtistName(artistId);
//   const pdfUri = await generatePagePdf(songTitle, page, artist);

//   const pdfContent = await FileSystem.readAsStringAsync(pdfUri, {
//     encoding: FileSystem.EncodingType.Base64,
//   });
//   const lyricsBuffer = Buffer.from(pdfContent, 'base64');

//   return lyricsBuffer;
// };
