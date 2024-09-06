import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import { RootStackParamList } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import useCommonModalStyle from '@src/styles/commonModal';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { createSongRequest } from '@src/state/sagas/actionCreators';
import { Screen } from '@src/components/common/enums';
import { selectDisplayTips } from '@src/state/selectors/settingsSelector';
import Gap from '@src/components/common/components/Gap';

interface Props {
  isNewSongOpen: boolean;
  setIsNewSongOpen: (value: boolean) => void;
}

const NewSongModal = ({ isNewSongOpen, setIsNewSongOpen }: Props) => {
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const { navigate, addListener } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useCommonModalStyle();
  const displayTips = useAppSelector(selectDisplayTips);

  const [songTitle, setSongTitle] = useState('');
  const onExitPress = () => {
    setIsNewSongOpen(false);
    setSongTitle('');
  };

  const disabled: boolean = !songTitle;

  const onSavePress = () => {
    dispatch(createSongRequest({ db, title: songTitle }));

    navigate(Screen.SONG);
  };

  useEffect(
    () =>
      addListener('blur', () => {
        setIsNewSongOpen(false);
        setSongTitle('');
      }),
    [navigate],
  );

  return (
    <Modal
      isVisible={isNewSongOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
    >
      <View style={styles.container}>
        <StyledText style={styles.title}>Song Title</StyledText>
        <View>
          <View style={styles.textbox}>
            <TextInput
              style={styles.input}
              placeholder="Cobra Strike Alpha Deluxe"
              value={songTitle}
              onChangeText={(title: string) => setSongTitle(title)}
            />
          </View>
          {displayTips ? (
            <StyledText style={styles.tipText}>
              Tip: Double Tap the Title of a saved Song or Take to rename
            </StyledText>
          ) : (
            <Gap />
          )}
        </View>
        <SaveAndCancelButtons
          onPress={onSavePress}
          onExitPress={onExitPress}
          disabled={disabled}
        />
      </View>
    </Modal>
  );
};

export default NewSongModal;
