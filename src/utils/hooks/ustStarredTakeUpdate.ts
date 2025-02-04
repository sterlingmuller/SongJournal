import { useSQLiteContext } from 'expo-sqlite';

import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
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

export const useStarredTakeUpdateAndUpload = () => {
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { generateAndUploadFile, deleteFile } = useDropboxFileGenerator();
  const isAutoSyncEnabled = useAppSelector(selectIsAutoSyncEnabled);
  const { isUnstarredTakeConditionEnabled } = useAppSelector(selectSyncFilters);
  const song = useAppSelector(selectCurrentSong);
  const { currentTakeUri, currentTakeTitle } =
    useAppSelector(selectCurrentTakeUri);

  const { title: songTitle } = song;

  const updateAndUploadStarredTake = async (
    newStarredTakeId: number,
    songId: number,
    newUri: string,
    newStarredTakeTitle: string,
  ) => {
    try {
      const resultAction = await dispatch(
        updateSelectedTakeRequest({ takeId: newStarredTakeId, songId, db }),
      );

      if (updateSelectedTakeRequest.fulfilled.match(resultAction)) {
        dispatch(
          updateSelectedTakeIdSuccess({ songId, takeId: newStarredTakeId }),
        );

        if (isAutoSyncEnabled) {
          // it is currently updating the old starred take to be in the takes folder, but it is not replacing the opriginal starred take with the new one in the root folder
          // additionally, need to make a seperate request to delete the take from the take folder when added to the root

          generateAndUploadFile(songTitle, newUri, CloudFileType.STARRED_TAKE);

          if (isUnstarredTakeConditionEnabled) {
            deleteFile(songTitle, newStarredTakeTitle);
            generateAndUploadFile(
              songTitle,
              currentTakeUri,
              CloudFileType.TAKE,
              currentTakeTitle,
            );
          }
        }
      }
    } catch {
      console.error('failure');
    }
  };

  return updateAndUploadStarredTake;
};

export default useStarredTakeUpdateAndUpload;
