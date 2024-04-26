import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import PageIcon from '@src/icons/PageIcon';
import { RootStackParamList, song } from '@src/common/types';

interface Props {
  song: song;
}

const HeaderPageButton = ({ song }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigate('Lyrics', { song })}>
      <PageIcon />
    </TouchableOpacity>
  );
};

export default HeaderPageButton;
