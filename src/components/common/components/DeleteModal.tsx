import React from 'react';
import { View, Button, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import { DeleteObject } from '@src/components/common/types';
import { EMPTY_DELETE_OBJECT } from '@src/components/common/constants';
import StyledText from '@src/components/common/components/StyledText';
import useDeleteModalStyles from '@src/styles/deleteModal';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { selectPlayingId } from '@src/state/selectors/playbackSelector';
import {
  deleteSongRequest,
  deleteTakeRequest,
} from '@src/state/sagas/actionCreators';
import {
  selectCurrentSongSelectedTakeId,
  selectCurrentSongTakes,
} from '@src/state/selectors/songsSelector';
import { findReplacementStarredTakeId } from '@src/utils/replaceStarredTake';
import { updateSelectedTakeRequest } from '@src/state/thunk/takeThunk';
import { updateSelectedTakeIdSuccess } from '@src/state/slice/songsSlice';

interface Props {
  setToDelete: (value: DeleteObject | null) => void;
  deleteText: string;
  toDelete: DeleteObject | null;
}

const DeleteModal = (props: Props) => {
  const styles = useDeleteModalStyles();
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const { clearPlayback } = useAudioPlayer();
  const playingId = useAppSelector(selectPlayingId);
  const selectedTakeId = useAppSelector(selectCurrentSongSelectedTakeId);
  const currentSongTakes = useAppSelector(selectCurrentSongTakes);

  const { deleteText, setToDelete, toDelete } = props;
  const { title, songId, takeId, type } = toDelete;

  const onExitPress = (): void => {
    setToDelete(EMPTY_DELETE_OBJECT);
  };

  const onDeletePress = async () => {
    if (type === 'song') {
      if (songId === playingId) {
        clearPlayback();
      }

      dispatch(deleteSongRequest({ db, songId }));
    } else if (type === 'take') {
      if (takeId === playingId) {
        clearPlayback();
      }

      if (takeId === selectedTakeId) {
        const newSelectedTakeId = findReplacementStarredTakeId(
          takeId,
          currentSongTakes,
        );

        const resultAction = await dispatch(
          updateSelectedTakeRequest({
            songId,
            takeId: newSelectedTakeId,
            db,
          }),
        );

        if (updateSelectedTakeRequest.fulfilled.match(resultAction)) {
          dispatch(
            updateSelectedTakeIdSuccess({ songId, takeId: newSelectedTakeId }),
          );
        }
      }

      dispatch(deleteTakeRequest({ songId, takeId, db }));
    }

    setToDelete(EMPTY_DELETE_OBJECT);
  };

  return (
    <KeyboardAvoidingView>
      <Modal isVisible={!!title} avoidKeyboard onBackdropPress={onExitPress}>
        <View style={styles.container}>
          <StyledText style={styles.title}>
            Delete {title} from Google account and current device
          </StyledText>
          <StyledText style={styles.text}>
            {title}
            {deleteText}
          </StyledText>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button title="Delete" onPress={onDeletePress} color="red" />
            </View>
            <View style={styles.button}>
              <Button title="Cancel" color="#D6D6D6" onPress={onExitPress} />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default DeleteModal;
