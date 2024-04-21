import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import PageIcon from '@src/icons/PageIcon';
import { RootStackParamList } from '@src/common/types';

interface Props {
  currentSong: string;
}

const HeaderPageButton = ({ currentSong }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigate('Lyrics', { currentSong })}>
      <PageIcon />
    </TouchableOpacity>
  );
};

export default HeaderPageButton;
