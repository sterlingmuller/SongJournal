import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '@src/common/types';
import InfoIcon from '@src/icons/InfoIcon';

interface Props {
  currentSong: string;
}

const HeaderInfoButton = ({ currentSong }: Props) => (
    <TouchableOpacity onPress={() => navigate('Lyrics', { currentSong })}>
      <InfoIcon />
    </TouchableOpacity>
);

export default HeaderInfoButton;
