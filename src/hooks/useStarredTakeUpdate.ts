import { useSQLiteContext } from 'expo-sqlite';

import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import {
  selectCurrentSong,
  selectCurrentTakeUri,
} from '@src/state/selectors/songsSelector';
import {
  selectIsAutoSyncEnabled,
  selectSyncFilters,
} from '@src/state/selectors/settingsSelector';
import useDropboxFileGenerator from '@src/services/cloudStorage/dropbox/hooks/useDropboxFileGenerator';
import { CloudFileType } from '@src/components/common/enums';
import { updateSelectedTakeRequest } from '@src/state/thunk/takeThunk';
import { updateSelectedTakeIdSuccess } from '@src/state/slice/songsSlice';

const useStarredTakeUpdateAndUpload = () => {
  const currentTakeData = useAppSelector(selectCurrentTakeUri);
  const currentTakeUri = currentTakeData?.currentTakeUri;
  const currentTakeTitle = currentTakeData?.currentTakeTitle;
  const isAutoSyncEnabled = useAppSelector(selectIsAutoSyncEnabled);
  const { isUnstarredTakeConditionEnabled } = useAppSelector(selectSyncFilters);
  const song = useAppSelector(selectCurrentSong);
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { generateAndUploadFile, generateFileDeletion } =
    useDropboxFileGenerator();

  const updateAndUploadStarredTake = async (
    newStarredTakeId: number,
    songId: number,
    newUri: string,
    newStarredTakeTitle: string
  ) => {
    const { title: songTitle } = song;

    try {
      const resultAction = await dispatch(
        updateSelectedTakeRequest({ takeId: newStarredTakeId, songId, db })
      );

      if (updateSelectedTakeRequest.fulfilled.match(resultAction)) {
        dispatch(
          updateSelectedTakeIdSuccess({ songId, takeId: newStarredTakeId })
        );

        if (isAutoSyncEnabled) {
          generateAndUploadFile(songTitle, newUri, CloudFileType.STARRED_TAKE);

          if (
            isUnstarredTakeConditionEnabled &&
            currentTakeUri &&
            currentTakeTitle
          ) {
            generateFileDeletion(songTitle, newStarredTakeTitle);
            generateAndUploadFile(
              songTitle,
              currentTakeUri,
              CloudFileType.TAKE,
              currentTakeTitle
            );
          }
        }
      }
    } catch (err) {
      console.error('Error updating or uploading starred take:', err);
    }
  };

  return updateAndUploadStarredTake;
};

export default useStarredTakeUpdateAndUpload;
