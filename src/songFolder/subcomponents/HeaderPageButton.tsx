import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import PageIcon from '@src/icons/PageIcon';
import { RootStackParamList } from '@src/common/types';

const HeaderPageButton = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigate('Lyrics')}>
      <PageIcon />
    </TouchableOpacity>
  );
};

export default HeaderPageButton;
