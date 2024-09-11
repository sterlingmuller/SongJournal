import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';
import { useColorTheme } from '@src/state/context/ThemeContext';
import EggSelectIcon from '@src/icons/EggSelectIcon';
import BadEggSelectIcon from '@src/icons/BadEggSelectIcon';
import CacsusSelectIcon from '@src/icons/CacsusSelectIcon';
import DeadAdimSelectIcon from '@src/icons/DeadAdimSelectIcon';

const ChooseComposer = () => {
  const styles = useSettingsStyle();
  const { theme } = useColorTheme();

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Choose Your Composer</StyledText>
      <View style={styles.composerContainer}>
        <EggSelectIcon />
        <BadEggSelectIcon />
      </View>
      <View style={styles.composerContainer}>
        <CacsusSelectIcon />
        <DeadAdimSelectIcon />
      </View>
    </View>
  );
};

export default ChooseComposer;
