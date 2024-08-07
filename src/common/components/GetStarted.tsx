import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/common/components/StyledText';
import useGetStartedHomeStyles from '@src/styles/getStartedHome';
import EggIcon from '@src/icons/EggIcon';

interface props {
  screen: 'home' | 'song' | 'musicPlayer';
}
const GetStarted = ({ screen }: props) => {
  const styles = useGetStartedHomeStyles();
  let message: React.ReactElement;

  const getStartedHomeInstructions = (
    <StyledText style={styles.text}>
      {`Looks like your journal is empty.\nTo get started, visit `}
      <StyledText style={{ fontWeight: 'bold' }}>Settings</StyledText> 4&#8260;4
      help importing a journal or press the{' '}
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

  const musicPlayerPlansMessage = (
    <StyledText style={styles.text}>
      Ah! What are <StyledText style={{ fontStyle: 'italic' }}>you</StyledText>{' '}
      doing here!? The{' '}
      <StyledText style={{ fontWeight: 'bold' }}>Music Player</StyledText> is
      not ready 4&#8260;4 the world to{' '}
      <StyledText style={{ fontWeight: 'bold' }}>C</StyledText>
    </StyledText>
  );

  switch (screen) {
    case 'home':
      message = getStartedHomeInstructions;
      break;
    case 'song':
      message = getStartedSongInstructions;
      break;
    case 'musicPlayer':
      message = musicPlayerPlansMessage;
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.eggContainer}>
        <EggIcon />
      </View>
      <View style={styles.textbox}>
        {message}
        <View style={styles.arrow} />
      </View>
    </View>
  );
};

export default GetStarted;
