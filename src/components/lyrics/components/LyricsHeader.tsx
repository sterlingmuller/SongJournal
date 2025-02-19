import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import InfoIcon from '@src/icons/InfoIcon';
import BackIcon from '@src/icons/BackIcon';
import useLyricsHeaderStyles from '@src/styles/navigationHeader';
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
          <TouchableOpacity onPress={handleSaveLyrics} hitSlop={10}>
            <CheckIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelEdit} hitSlop={10}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => setIsInfoModalOpen(!isInfoModalOpen)}
        hitSlop={20}
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
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      </View>
      {renderIcon()}
    </View>
  );
};

export default LyricsHeader;
