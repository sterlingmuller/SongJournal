import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '@src/icons/BackIcon';

const HeaderBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ paddingRight: 20 }}
    >
      <BackIcon />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
