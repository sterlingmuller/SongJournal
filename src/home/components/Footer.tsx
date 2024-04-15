import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import homeFooterStyles from '@styles/homeFooter'
import PlaylistIcon from '@src/icons/PlaylistIcon';
import MusicPlayerIcon from '@src/icons/MusicPlayerIcon';
import SettingIcon from '@src/icons/SettingIcon';

const Footer = () => {
  const {navigate} = useNavigation<NavigationProp<any>>();

   return (
    <View style={homeFooterStyles.container}>
      <TouchableOpacity >
        <PlaylistIcon />
      </TouchableOpacity>
      <TouchableOpacity >
        <MusicPlayerIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Settings')}>
        <SettingIcon />
      </TouchableOpacity>
    </View>
   );
};

export default Footer;