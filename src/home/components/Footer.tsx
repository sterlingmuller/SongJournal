import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { RootStackParamList, tab, tabNames } from '@src/common/types';
import useHomeFooterStyles from '@styles/homeFooter';
import { TABS } from '@src/common/constants';
import { useAudioPlayer } from '@src/context/AudioContext';

const Footer = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useHomeFooterStyles();
  const { clearPlayback } = useAudioPlayer();

  const handleTabPress = (screenName: tabNames) => {
    clearPlayback();

    // ts error because no playlist screen atm
    navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab: tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => handleTabPress(tab.name)}
        >
          <tab.icon />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;
