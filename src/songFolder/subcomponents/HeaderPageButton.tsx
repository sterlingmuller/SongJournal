import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import PageIcon from '@src/icons/PageIcon';
import { RootStackParamList } from '@src/common/types';
import { useAudioPlayer } from '@src/context/AudioContext';

const HeaderPageButton = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { clearPlayback } = useAudioPlayer();

  const onNavigationPress = () => {
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
