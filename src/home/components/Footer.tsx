import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import PlaylistIcon from '@src/icons/PlaylistIcon';
import MusicPlayerIcon from '@src/icons/MusicPlayerIcon';
import SettingIcon from '@src/icons/SettingIcon';
import { RootStackParamList } from '@src/common/types';
import useHomeFooterStyles from '@styles/homeFooter';

const Footer = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useHomeFooterStyles();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <PlaylistIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('MusicPlayer')}>
        <MusicPlayerIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Settings')}>
        <SettingIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
