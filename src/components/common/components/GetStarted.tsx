import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useGetStartedHomeStyles from '@src/styles/getStartedHome';
import EggIcon from '@src/icons/EggIcon';
import { Screen } from '@src/components/common/enums';
import { FRACTION_UNICODE } from '../constants';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectDisplayTips } from '@src/state/selectors/settingsSelector';

interface props {
  screen: 'Home' | 'Song' | 'MusicPlayer';
}
const GetStarted = ({ screen }: props) => {
  const styles = useGetStartedHomeStyles();
  let message: React.ReactElement;
  let tip: string;
  const displayTips = useAppSelector(selectDisplayTips);

  const getStartedHomeInstructions = (
    <StyledText style={styles.text}>
      {`Looks like your journal is empty.\nTo get started, visit `}
      <StyledText style={styles.boldText}>
        Settings 4{FRACTION_UNICODE}4
      </StyledText>{' '}
      help importing a journal or press the{' '}
      <StyledText style={styles.boldText}>New Song</StyledText> button below.
    </StyledText>
  );

  const homeTip: string =
    'Tip: Visit Settings for the options to number your Songs List and disable future Tips';
  const songTip: string =
    'Tip: When there are multiple Takes of a Song, Double Tap a Take to set it as the new Starred Take';

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
      <StyledText style={styles.boldText}>4{FRACTION_UNICODE}4</StyledText> the
      world to <StyledText style={styles.boldText}>C</StyledText>
    </StyledText>
  );

  switch (screen) {
    case Screen.HOME:
      message = getStartedHomeInstructions;
      tip = homeTip;
      break;
    case Screen.SONG:
      message = getStartedSongInstructions;
      tip = songTip;
      break;
    case Screen.MUSIC_PLAYER:
      message = musicPlayerPlansMessage;
      tip = '';
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
      {displayTips && <StyledText style={styles.tipText}>{tip}</StyledText>}
    </View>
  );
};

export default GetStarted;
