import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import PageIcon from '@src/icons/PageIcon';
import { RootStackParamList } from '@src/common/types';
import { useAudioPlayer } from '@src/context/AudioContext';
import { useAppDispatch, useAppSelector } from '@src/common/hooks';
import { fetchPageRequest } from '@src/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';
import { selectCurrentSongId } from '@src/selectors/songsSelector';

const HeaderPageButton = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { clearPlayback } = useAudioPlayer();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const songId = useAppSelector(selectCurrentSongId);

  const onNavigationPress = () => {
    dispatch(fetchPageRequest({ songId, db }));
    clearPlayback();

    navigate('Lyrics');
  };

  return (
    <TouchableOpacity onPress={onNavigationPress}>
      <PageIcon />
    </TouchableOpacity>
  );
};

export default HeaderPageButton;
