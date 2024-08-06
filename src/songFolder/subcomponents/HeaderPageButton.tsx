import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import PageIcon from '@src/icons/PageIcon';
import { useAppSelector } from '@src/common/hooks';
import { RootStackParamList } from '@src/common/types';
import { useAudioPlayer } from '@src/context/AudioContext';
import { selectIsPlaying } from '@src/selectors/playbackSelector';

const HeaderPageButton = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { stop } = useAudioPlayer();
  const isPlaying = useAppSelector(selectIsPlaying);

  const onNavigationPress = () => {
    if (isPlaying) {
      stop();
    }

    navigate('Lyrics');
  };

  return (
    <TouchableOpacity onPress={onNavigationPress}>
      <PageIcon />
    </TouchableOpacity>
  );
};

export default HeaderPageButton;
