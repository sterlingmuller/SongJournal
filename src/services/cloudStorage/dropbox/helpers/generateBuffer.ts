import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { Page } from '@src/components/common/types';
import { generatePagePdf } from '@src/utils/generatePagePdf';
import { useArtistName } from '@src/utils/hooks/useArtistName';

export const generateBuffer = async (uri: string) => {
  const selectedTakeContent = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const takeBuffer = Buffer.from(selectedTakeContent, 'base64');

  return takeBuffer;
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
