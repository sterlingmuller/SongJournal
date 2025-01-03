import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useGetStartedHomeStyles from '@src/styles/getStartedHome';
import { Conductor, Screen } from '@src/components/common/enums';
import { FRACTION_UNICODE } from '../constants';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import {
  selectConductor,
  selectDisplayTips,
} from '@src/state/selectors/settingsSelector';
import EggIcon from '@src/icons/EggIcon';
import BadEggIcon from '@src/icons/BadEggIcon';
import CacsusIcon from '@src/icons/CacsusIcon';
import DeadAdimIcon from '@src/icons/DeadAdimIcon';

interface props {
  screen: 'Home' | 'Song' | 'MusicPlayer' | 'Setlist' | 'ConnectionSuccess';
}
const ComposerMessage = ({ screen }: props) => {
  const styles = useGetStartedHomeStyles();
  const conductor = useAppSelector(selectConductor);
  const displayTips = useAppSelector(selectDisplayTips);

  let message: React.ReactElement;
  let tip: string;

  const homeTip: string =
    'Tip: Visit Settings for the options to number your Songs List and disable future Tips';
  const songTip: string =
    'Tip: When there are multiple Takes of a Song, Double Tap a Take to set it as the new Starred Take';

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

  const setlistPlansMessage = (
    <StyledText style={styles.text}>
      Ah! What are <StyledText style={styles.italicText}>you</StyledText> doing
      here!? The{' '}
      <StyledText style={styles.boldText}>Setlist Creator</StyledText> is not
      ready{' '}
      <StyledText style={styles.boldText}>4{FRACTION_UNICODE}4</StyledText> the
      world to <StyledText style={styles.boldText}>C</StyledText>
    </StyledText>
  );

  const dropboxConnectedMessage = (
    <StyledText style={styles.text}>
      Oh score! You are now connected to your{' '}
      <StyledText style={styles.boldText}>Dropbox</StyledText> account. Press
      below to enable auto-syncing.
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
    case Screen.SETLIST:
      message = setlistPlansMessage;
      tip = '';
      break;
    case Screen.CONNECTION_SUCCESS:
      message = dropboxConnectedMessage;
      tip = '';
      break;
  }

  const renderConductor = () => {
    switch (conductor) {
      case Conductor.EGG:
        return <EggIcon />;
      case Conductor.BAD_EGG:
        return <BadEggIcon />;
      case Conductor.CACSUS:
        return <CacsusIcon />;
      case Conductor.DEAD_ADIM:
        return <DeadAdimIcon />;
      default:
        return <EggIcon />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.eggContainer}>{renderConductor()}</View>
      <View style={styles.textbox}>
        {message}
        <View style={styles.arrow} />
      </View>
      {displayTips && <StyledText style={styles.tipText}>{tip}</StyledText>}
    </View>
  );
};

export default ComposerMessage;
