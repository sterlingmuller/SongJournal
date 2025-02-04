import { useSQLiteContext } from 'expo-sqlite';

import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { selectCurrentSong } from '@src/state/selectors/songsSelector';
import {
  selectIsAutoSyncEnabled,
  selectSyncFilters,
} from '@src/state/selectors/settingsSelector';
import useDropboxFileGenerator from '@src/services/cloudStorage/dropbox/hooks/useDropboxFileGenerator';
import {
  updateSongTitleSuccess,
  updateTakeTitleSuccess,
} from '@src/state/slice/songsSlice';
import { updateSongTitleRequest } from '@src/state/thunk/songThunk';
import { updateTakeTitleRequest } from '@src/state/thunk/takeThunk';

export const useRenameUpdateAndUpload = () => {
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { generateSongRename, generateTakeRename } = useDropboxFileGenerator();
  const isAutoSyncEnabled = useAppSelector(selectIsAutoSyncEnabled);
  const { isUnstarredTakeConditionEnabled } = useAppSelector(selectSyncFilters);

  const updateAndUploadSongRename = async (
    originalTitle: string,
    newTitle: string,
    songId: number,
  ) => {
    try {
      const resultAction = await dispatch(
        updateSongTitleRequest({ db, title: newTitle, songId }),
      );

      if (updateSongTitleRequest.fulfilled.match(resultAction)) {
        dispatch(updateSongTitleSuccess({ songId, title: newTitle }));

        if (isAutoSyncEnabled) {
          generateSongRename(originalTitle, newTitle);
        }
      }
    } catch (err) {
      console.error('Error updating or uploading renamed song:', err);
    }
  };

  const updateAndUploadTakeRename = async (
    songTitle: string,
    originalTakeTitle: string,
    newTakeTitle: string,
    songId: number,
    takeId: number,
  ) => {
    try {
      const resultAction = await dispatch(
        updateTakeTitleRequest({ db, title: newTakeTitle, songId, takeId }),
      );

      if (updateTakeTitleRequest.fulfilled.match(resultAction)) {
        dispatch(
          updateTakeTitleSuccess({ songId, title: newTakeTitle, takeId }),
        );

        if (isAutoSyncEnabled && isUnstarredTakeConditionEnabled) {
          generateTakeRename(originalTakeTitle, newTakeTitle, songTitle);
        }
      }
    } catch (err) {
      console.error('Error updating or uploading renamed take:', err);
    }
  };

  return { updateAndUploadSongRename, updateAndUploadTakeRename };
};

export default useRenameUpdateAndUpload;
