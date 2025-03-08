import { useSQLiteContext } from 'expo-sqlite';

import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectCurrentSong } from '@src/state/selectors/songsSelector';
import { selectIsAutoSyncEnabled } from '@src/state/selectors/settingsSelector';
import useDropboxFileGenerator from '@src/services/cloudStorage/dropbox/hooks/useDropboxFileGenerator';
import { CloudFileType } from '@src/components/common/enums';
import {
  updateLyricsSuccess,
  updatePageInfoSuccess,
} from '@src/state/slice/pagesSlice';
import {
  updateInfoRequest,
  updateLyricsRequest,
} from '@src/state/thunk/pageThunk';
import { Page, SongInfo } from '@src/components/common/types';
import { generatePagePdf } from '@src/utils/generatePagePdf';
import { useArtistName } from '@src/hooks/useArtistName';
import { updateSongHasLyrics } from '@src/state/slice/songsSlice';
import { selectCurrentSongPage } from '@src/state/selectors/pagesSelector';

export const useLyricsSheetGenerator = () => {
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { generateAndUploadFile } = useDropboxFileGenerator();
  const isAutoSyncEnabled = useAppSelector(selectIsAutoSyncEnabled);
  const { getArtistName } = useArtistName();
  const song = useAppSelector(selectCurrentSong);
  const page = useAppSelector(selectCurrentSongPage);

  const generatePdf = async (
    title: string,
    newPage: Page,
    artistId: number,
  ) => {
    const artist = getArtistName(artistId);
    const pdfUri = await generatePagePdf(title, newPage, artist);

    return pdfUri;
  };

  const updateLyrics = async (newLyrics: string) => {
    const { artistId, title, songId } = song;

    try {
      const resultAction = await dispatch(
        updateLyricsRequest({
          songId,
          lyrics: newLyrics,
          db,
        }),
      );

      if (updateLyricsRequest.fulfilled.match(resultAction)) {
        dispatch(
          updateLyricsSuccess({ songId, lyrics: newLyrics }),
          updateSongHasLyrics({ songId, lyrics: newLyrics }),
        );
        if (isAutoSyncEnabled) {
          const newPage = {
            ...page,
            lyrics: newLyrics,
          };

          const pdfUri = await generatePdf(title, newPage, artistId);

          // may need to add revisionId in the future
          generateAndUploadFile(title, pdfUri, CloudFileType.PAGE);
        }
      }
    } catch (error) {
      console.error('Error updating lyrics in generator:', error);
    }
  };

  const updateInfo = async (
    newInfo: Partial<SongInfo>,
    selectedArtistId: number,
  ) => {
    const { title, songId } = song;

    try {
      if (Object.keys(newInfo).length > 0) {
        const resultAction = await dispatch(
          updateInfoRequest({
            songId,
            info: newInfo,
            db,
          }),
        );

        if (updateInfoRequest.fulfilled.match(resultAction)) {
          dispatch(updatePageInfoSuccess({ songId, info: newInfo }));

          if (isAutoSyncEnabled) {
            const newPage = {
              ...page,
              info: newInfo,
            };

            const pdfUri = await generatePdf(title, newPage, selectedArtistId);

            // may need to add revisionId in the future
            generateAndUploadFile(title, pdfUri, CloudFileType.PAGE);
          }
        }
      } else {
        const pdfUri = await generatePdf(title, page, selectedArtistId);

        // may need to add revisionId in the future
        generateAndUploadFile(title, pdfUri, CloudFileType.PAGE);
      }
    } catch (error) {
      console.error('Error updating page info:', error);
    }
  };

  return { updateLyrics, updateInfo };
};

export default useLyricsSheetGenerator;
