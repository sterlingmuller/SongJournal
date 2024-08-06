import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { RootStackParamList, tab, tabNames } from '@src/common/types';
import useHomeFooterStyles from '@styles/homeFooter';
import { TABS } from '@src/common/constants';
import { useAudioPlayer } from '@src/context/AudioContext';
import { useAppSelector } from '@src/common/hooks';
import { selectIsPlaying } from '@src/selectors/playbackSelector';

const Footer = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useHomeFooterStyles();
  const { stop } = useAudioPlayer();
  const isPlaying = useAppSelector(selectIsPlaying);

  const handleTabPress = (screenName: tabNames) => {
    if (isPlaying) {
      stop();
    }
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
