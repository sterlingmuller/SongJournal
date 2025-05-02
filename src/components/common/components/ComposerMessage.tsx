import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useConductorMessageStyles from '@src/styles/conductorMessageStyles';
import { Conductor, MessageIntent } from '@src/components/common/enums';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import {
  selectConductor,
  selectDisplayTips,
} from '@src/state/selectors/settingsSelector';
import EggIcon from '@src/icons/EggIcon';
import BadEggIcon from '@src/icons/BadEggIcon';
import CacsusIcon from '@src/icons/CacsusIcon';
import DeadAdimIcon from '@src/icons/DeadAdimIcon';
import { LYRICS_TIP, SONG_SCREEN_TIP, START_TIP } from '../constants';

interface props {
  messageIntent: MessageIntent;
}
const ComposerMessage = ({ messageIntent }: props) => {
  const styles = useConductorMessageStyles();
  const conductor = useAppSelector(selectConductor);
  const displayTips = useAppSelector(selectDisplayTips);

  let message: React.ReactElement;
  let tip: string;

  const getStartedHomeInstructions = (
    <StyledText style={styles.text}>
      {`Looks like your journal is empty.\nTo get started, visit `}
      <StyledText style={styles.boldText}>Settings 4/4</StyledText> help
      importing a journal or press the{' '}
      <StyledText style={styles.boldText}>New Song</StyledText> button below.
    </StyledText>
  );

  const getStartedSongInstructions = (
    <StyledText style={styles.text}>
      Press the <StyledText style={styles.boldText}>Record</StyledText> button
      below to record your first take!
    </StyledText>
  );

  const getStartedLyricsInstructions = (
    <StyledText style={styles.text}>
      Press <StyledText style={styles.boldText}>Edit</StyledText> to write
      lyrics, or <StyledText style={styles.boldText}>Details</StyledText> to add
      information about your song.
    </StyledText>
  );

  const emptySearchMessage = (
    <StyledText style={styles.text}>
      Hmmm, I got nothin&apos;. It might be time to record a new{' '}
      <StyledText style={styles.boldText}>Song</StyledText> or refine your{' '}
      <StyledText style={styles.boldText}>Search</StyledText>.
    </StyledText>
  );

  const coversPlansMessage = (
    <StyledText style={styles.text}>
      Ah! What are <StyledText style={styles.italicText}>you</StyledText> doing
      here!? The <StyledText style={styles.boldText}>Covers Tab</StyledText> is
      not ready <StyledText style={styles.boldText}>4/4</StyledText> the world
      to <StyledText style={styles.boldText}>C</StyledText>
    </StyledText>
  );

  const setlistPlansMessage = (
    <StyledText style={styles.text}>
      Ah! What are <StyledText style={styles.italicText}>you</StyledText> doing
      here!? The{' '}
      <StyledText style={styles.boldText}>Setlist Creator</StyledText> is not
      ready <StyledText style={styles.boldText}>4/4</StyledText> the world to{' '}
      <StyledText style={styles.boldText}>C</StyledText>
    </StyledText>
  );

  const dropboxConnectedMessage = (
    <StyledText style={styles.text}>
      Oh score! You are now connected to your{' '}
      <StyledText style={styles.boldText}>Dropbox</StyledText> account. Press
      below to enable auto-syncing.
    </StyledText>
  );

  switch (messageIntent) {
    case MessageIntent.GET_STARTED_HOME:
      message = getStartedHomeInstructions;
      tip = START_TIP;
      break;
    case MessageIntent.GET_STARTED_LYRICS:
      message = getStartedLyricsInstructions;
      tip = LYRICS_TIP;
      break;
    case MessageIntent.GET_STARTED_SONG:
      message = getStartedSongInstructions;
      tip = SONG_SCREEN_TIP;
      break;
    case MessageIntent.HIDE_COVERS_SCREEN:
      message = coversPlansMessage;
      tip = '';
      break;
    case MessageIntent.HIDE_SETLIST_SCREEN:
      message = setlistPlansMessage;
      tip = '';
      break;
    case MessageIntent.DROPBOX_CONNECTION_SUCCESS:
      message = dropboxConnectedMessage;
      tip = '';
      break;
    case MessageIntent.EMPTY_SEARCH:
      message = emptySearchMessage;
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
      <View style={styles.textbox}>{message}</View>
      {displayTips && (
        <View style={styles.tipContainer}>
          <StyledText style={styles.tipText}>{tip}</StyledText>
        </View>
      )}
    </View>
  );
};

export default ComposerMessage;
