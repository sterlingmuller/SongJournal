import React, { useCallback, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import ChordWheelModal from '@src/components/lyrics/components/ChordWheelModal';
import TimeSignatureWheelModal from '@src/components/lyrics/components/TimeSignatureWheelModal';
import { SongDetailKey } from '@src/components/common/enums';
import { SONG_DETAILS } from '@src/components/common/constants';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Props {
  label: string;
  value: string;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const SongDetailSelect = (props: Props) => {
  const { label, value, handleInputChange } = props;
  const styles = useSongDetailStyles();
  const { theme } = useColorTheme();

  const [isChordWheelOpen, setIsChordWheelOpen] = useState(false);
  const [isTimeWheelOpen, setIsTimeWheelOpen] = useState(false);

  const songDetailPress = useCallback(() => {
    if (label === SONG_DETAILS[SongDetailKey.KEY_SIGNATURE]) {
      setIsChordWheelOpen(true);
    } else {
      setIsTimeWheelOpen(true);
    }
  }, [label]);

  const textStyle = useMemo(
    () => [styles.inputText, !value && { color: theme.placeholderText }],
    [styles.inputText, value, theme.placeholderText],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={songDetailPress} style={styles.textbox}>
        <StyledText style={textStyle}>{value || '--'}</StyledText>
      </TouchableOpacity>
      <StyledText style={styles.labelText}>{label}</StyledText>
      <ChordWheelModal
        isWheelOpen={isChordWheelOpen}
        setIsWheelOpen={setIsChordWheelOpen}
        handleInputChange={handleInputChange}
        initialValue={value}
      />
      <TimeSignatureWheelModal
        isWheelOpen={isTimeWheelOpen}
        setIsWheelOpen={setIsTimeWheelOpen}
        handleInputChange={handleInputChange}
        initialValue={value}
      />
    </View>
  );
};

export default React.memo(SongDetailSelect);
