import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/common/components/StyledText';
import EggIcon from '@src/icons/EggIcon';
import useGetStartedHomeStyles from '@src/styles/getStartedHome';
import Egg2Icon from '@src/icons/Egg2Icon';

interface props {
  screen: 'home' | 'song';
}
const GetStarted = ({ screen }: props) => {
  const styles = useGetStartedHomeStyles();
  let instructions: React.ReactElement;

  const getStartedHomeInstructions = (
    <StyledText style={styles.text}>
      {`Looks like your journal is empty.\nTo get started, visit `}
      <StyledText style={{ fontWeight: 'bold' }}>Settings</StyledText> for help
      importing a journal or press the{' '}
      <StyledText style={{ fontWeight: 'bold' }}>New Song</StyledText> button
      below.
    </StyledText>
  );

  const getStartedSongInstructions = (
    <StyledText style={styles.text}>
      Press the <StyledText style={{ fontWeight: 'bold' }}>Record</StyledText>{' '}
      button below to record your first take!
    </StyledText>
  );

  if (screen === 'home') {
    instructions = getStartedHomeInstructions;
  } else {
    instructions = getStartedSongInstructions;
  }

  return (
    <View style={styles.container}>
      <View style={styles.eggContainer}>
        <Egg2Icon />
      </View>
      <View style={styles.textbox}>
        {instructions}
        <View style={styles.arrow} />
      </View>
    </View>
  );
};

export default GetStarted;
