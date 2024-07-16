import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/common/components/StyledText';
import {
  getStartedHomeInstructions,
  getStartedSongInstructions,
} from '@src/common/constants';
import EggIcon from '@src/icons/EggIcon';
import useGetStartedHomeStyles from '@src/styles/getStartedHome';
import Egg2Icon from '@src/icons/Egg2Icon';

interface props {
  screen: 'home' | 'song';
}
const GetStarted = ({ screen }: props) => {
  const styles = useGetStartedHomeStyles();
  let instructions = '';

  if (screen === 'home') {
    instructions = getStartedHomeInstructions;
  } else {
    instructions = getStartedSongInstructions;
  }

  return (
    <View style={styles.container}>
      <View style={styles.eggContainer}>
        {/* <EggIcon /> */}
        <Egg2Icon />
      </View>
      <View style={styles.textbox}>
        <StyledText style={styles.text}>{instructions}</StyledText>
        <View style={styles.arrow} />
      </View>
    </View>
  );
};

export default GetStarted;
