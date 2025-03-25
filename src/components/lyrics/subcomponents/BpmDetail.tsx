import React from 'react';
import { TextInput, View } from 'react-native';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/components/common/types';
import { SONG_DETAILS } from '@src/components/common/constants';
import StyledText from '@src/components/common/components/StyledText';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Props {
  value: string;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const BpmDetail = (props: Props) => {
  const { value, handleInputChange } = props;
  const styles = useSongDetailStyles();
  const { theme } = useColorTheme();

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textbox,
          styles.inputText,
          !value && { color: theme.placeholderText },
        ]}
        value={value || '--'}
        onChangeText={(newBpm: string) => handleInputChange('bpm', newBpm)}
        textAlign="center"
        keyboardType="numeric"
        caretHidden
      />
      <StyledText style={styles.labelText}>{SONG_DETAILS.bpm}</StyledText>
    </View>
  );
};

export default BpmDetail;
