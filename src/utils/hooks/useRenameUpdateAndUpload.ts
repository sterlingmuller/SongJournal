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
  updateSelectedTakeIdSuccess,
  updateSongTitleSuccess,
} from '@src/state/slice/songsSlice';
import { updateSongTitleRequest } from '@src/state/thunk/songThunk';

export const useRenameSongUpdateAndUpload = () => {
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { generateSongRename } = useDropboxFileGenerator();
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
      console.error('Error updating or uploading renamed take:', err);
    }
  };

  return { updateAndUploadSongRename };
};

export default useRenameSongUpdateAndUpload;
