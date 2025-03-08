import { useSQLiteContext } from 'expo-sqlite';

import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectCurrentSong } from '@src/state/selectors/songsSelector';
import {
  selectIsAutoSyncEnabled,
  selectSyncFilters,
} from '@src/state/selectors/settingsSelector';
import useDropboxFileGenerator from '@src/services/cloudStorage/dropbox/hooks/useDropboxFileGenerator';
import { CloudFileType } from '@src/components/common/enums';
import { createTakeRequest } from '@src/state/thunk/takeThunk';
import { createTakeSuccess } from '@src/state/slice/songsSlice';

export const useTakeGenerator = () => {
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { generateAndUploadFile } = useDropboxFileGenerator();
  const isAutoSyncEnabled = useAppSelector(selectIsAutoSyncEnabled);
  const { isUnstarredTakeConditionEnabled } = useAppSelector(selectSyncFilters);
  const song = useAppSelector(selectCurrentSong);

  const { title: songTitle, songId, totalTakes } = song;

  const generateTake = async (
    uri: string,
    takeTitle: string,
    duration: number,
  ) => {
    try {
      const resultAction = await dispatch(
        createTakeRequest({
          songId,
          title: takeTitle,
          date: new Date().toISOString(),
          uri,
          duration,
          db,
        }),
      );

      if (createTakeRequest.fulfilled.match(resultAction)) {
        const createdTake = resultAction.payload;

        if (createdTake) {
          dispatch(createTakeSuccess(createdTake));

          if (isAutoSyncEnabled) {
            const isCurrentTakeStarred = totalTakes === 0;

            if (isCurrentTakeStarred) {
              generateAndUploadFile(songTitle, uri, CloudFileType.STARRED_TAKE);
            } else if (isUnstarredTakeConditionEnabled) {
              generateAndUploadFile(
                songTitle,
                uri,
                CloudFileType.TAKE,
                takeTitle,
              );
            }
          }
        }
      }
    } catch (error) {
      console.error('Error creating take:', error);
    }
  };

  return generateTake;
};

export default useTakeGenerator;
