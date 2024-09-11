import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import InfoIcon from '@src/icons/InfoIcon';
import BackIcon from '@src/icons/BackIcon';
import useLyricsHeaderStyles from '@src/styles/lyricsHeader';
import { selectCurrentSongTitle } from '@src/state/selectors/songsSelector';
import CheckIcon from '@src/icons/CheckIcon';
import CloseIcon from '@src/icons/CloseIcon';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
  displaySave: boolean;
  handleSaveLyrics: () => void;
  handleCancelEdit: () => void;
}

const LyricsHeader = (props: Props) => {
  const {
    isInfoModalOpen,
    setIsInfoModalOpen,
    displaySave,
    handleSaveLyrics,
    handleCancelEdit,
  } = props;

  const styles = useLyricsHeaderStyles();
  const title = useSelector(selectCurrentSongTitle);
  const { goBack } = useNavigation();

  const renderIcon = () => {
    if (displaySave) {
      return (
        <View style={styles.headerIconRow}>
          <TouchableOpacity onPress={handleSaveLyrics}>
            <CheckIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelEdit}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.info}
        onPress={() => setIsInfoModalOpen(!isInfoModalOpen)}
      >
        <InfoIcon />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlePlusArrow}>
        <TouchableOpacity onPress={goBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      {renderIcon()}
    </View>
  );
};

export default LyricsHeader;
