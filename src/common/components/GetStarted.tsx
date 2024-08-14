import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/common/components/StyledText';
import useGetStartedHomeStyles from '@styles/getStartedHome';
import EggIcon from '@src/icons/EggIcon';
import { Screen } from '@src/common/enums';
import { FRACTION_4_4 } from '../constants';

interface props {
  screen: 'Home' | 'Song' | 'MusicPlayer';
}
const GetStarted = ({ screen }: props) => {
  const styles = useGetStartedHomeStyles();
  let message: React.ReactElement;

  const getStartedHomeInstructions = (
    <StyledText style={styles.text}>
      {`Looks like your journal is empty.\nTo get started, visit `}
      <StyledText style={styles.boldText}>
        Settings {FRACTION_4_4}
      </StyledText>{' '}
      help importing a journal or press the{' '}
      <StyledText style={styles.boldText}>New Song</StyledText> button below.
    </StyledText>
  );

  const getStartedSongInstructions = (
    <StyledText style={styles.text}>
      Press the <StyledText style={styles.boldText}>Record</StyledText> button
      below to record your first take!
    </StyledText>
  );

  const musicPlayerPlansMessage = (
    <StyledText style={styles.text}>
      Ah! What are <StyledText style={styles.italicText}>you</StyledText> doing
      here!? The <StyledText style={styles.boldText}>Music Player</StyledText>{' '}
      is not ready{' '}
      <StyledText style={styles.boldText}>{FRACTION_4_4}</StyledText> the world
      to <StyledText style={styles.boldText}>C</StyledText>
    </StyledText>
  );

  switch (screen) {
    case Screen.HOME:
      message = getStartedHomeInstructions;
      break;
    case Screen.SONG:
      message = getStartedSongInstructions;
      break;
    case Screen.MUSIC_PLAYER:
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
