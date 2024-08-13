import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';

import PageIcon from '@src/icons/PageIcon';
import { RootStackParamList } from '@src/common/types';
import { useAudioPlayer } from '@src/context/AudioContext';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { fetchPageRequest } from '@src/sagas/actionCreators';
import { selectCurrentSongId } from '@src/selectors/songsSelector';
import { Screen } from '@src/common/enums';

const HeaderPageButton = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { clearPlayback } = useAudioPlayer();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const songId = useAppSelector(selectCurrentSongId);

  const onNavigationPress = () => {
    dispatch(fetchPageRequest({ songId, db }));
    clearPlayback();

    navigate(Screen.Lyrics);
  };

  return (
    <TouchableOpacity onPress={onNavigationPress}>
      <PageIcon />
    </TouchableOpacity>
  );
};

export default HeaderPageButton;
