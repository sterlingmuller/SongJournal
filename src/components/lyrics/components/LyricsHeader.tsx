import React from 'react';
import { View, TouchableOpacity, Text, LayoutChangeEvent } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import InfoIcon from '@src/icons/InfoIcon';
import BackIcon from '@src/icons/BackIcon';
import useLyricsHeaderStyles from '@src/styles/navigationHeader';
import { selectCurrentSongTitle } from '@src/state/selectors/songsSelector';
import CheckIcon from '@src/icons/CheckIcon';
import CloseIcon from '@src/icons/CloseIcon';
import { LyricsOption } from '@src/components/common/enums';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
  displaySave: boolean;
  handleSaveLyrics: () => void;
  handleCancelEdit: () => void;
  headerHeight: number;
  setHeaderHeight: (value: number) => void;
  selectedOption: LyricsOption;
  setSelectedOption: (value: LyricsOption) => void;
}

const LyricsHeader = (props: Props) => {
  const {
    isInfoModalOpen,
    setIsInfoModalOpen,
    displaySave,
    handleSaveLyrics,
    handleCancelEdit,
    headerHeight,
    setHeaderHeight,
    selectedOption,
    setSelectedOption,
  } = props;

  const styles = useLyricsHeaderStyles();
  const title = useSelector(selectCurrentSongTitle);
  const { goBack } = useNavigation();

  const onLayoutHeader = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height !== headerHeight) {
      setHeaderHeight(height);
    }
  };

  const renderIcon = () => {
    if (displaySave) {
      return (
        <View style={styles.headerIconRow}>
          <TouchableOpacity onPress={handleCancelEdit} hitSlop={10}>
            <CloseIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaveLyrics} hitSlop={10}>
            <CheckIcon size={28} isPrimaryText />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => {
          if (selectedOption !== LyricsOption.NONE) {
            setSelectedOption(LyricsOption.NONE);
          }
          setIsInfoModalOpen(!isInfoModalOpen);
        }}
        hitSlop={20}
      >
        <InfoIcon />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container} onLayout={onLayoutHeader}>
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
