import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from '@react-navigation/native';

import {
  RootStackParamList,
  Tab,
  TabNames,
} from '@src/components/common/types';
import useHomeFooterStyles from '@src/styles/homeFooter';
import { TABS } from '@src/components/common/constants';
import { useAudioPlayer } from '@src/state/context/AudioContext';

const FloatingFooter = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const styles = useHomeFooterStyles();
  const { clearPlayback } = useAudioPlayer();

  const handleTabPress = (screenName: TabNames) => {
    clearPlayback();
    navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab: Tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => handleTabPress(tab.name)}
          style={
            route.name === tab.name ? styles.activeTab : styles.inactiveTab
          }
        >
          <tab.icon />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FloatingFooter;
