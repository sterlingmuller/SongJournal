import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import {
  SectionsWheelPicker,
  WheelPickerAlign,
  WheelPickerProps,
} from 'react-native-ui-lib';
import Modal from 'react-native-modal';

import { ROOT_NOTES, CHORD_EXTENSIONS } from '@src/components/common/constants';
import { SongDetailKey } from '@src/components/common/enums';
import useWheelPickerModalStyles from '@src/styles/wheelPickerModal';
import StyledText from '@src/components/common/components/StyledText';
import { SongInfo } from '@src/components/common/types';
import separateChordValue from '@src/utils/separateChordValue';

interface Props {
  isWheelOpen: boolean;
  setIsWheelOpen: (value: boolean) => void;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
  initialValue: string;
}

const ChordWheelModal = (props: Props) => {
  const { isWheelOpen, setIsWheelOpen, handleInputChange, initialValue } =
    props;
  const styles = useWheelPickerModalStyles();
  const initialValues = separateChordValue(initialValue);

  const [rootNote, setRootNote] = useState(initialValues.rootNote);
  const [chordExtension, setChordExtension] = useState(
    initialValues.chordExtension,
  );

  const onExitPress = () => {
    if (rootNote) {
      handleInputChange(SongDetailKey.KEY_SIGNATURE, rootNote + chordExtension);
    }

    setRootNote(initialValues.rootNote);
    setChordExtension(initialValues.chordExtension);
    setIsWheelOpen(false);
  };

  const sections = useMemo((): WheelPickerProps[] => {
    return [
      {
        items: ROOT_NOTES,
        onChange: (item: string) => setRootNote(item),
        initialValue: rootNote,
        label: 'Root Note',
        align: WheelPickerAlign.RIGHT,
        faderProps: { size: 0 },
        itemHeight: 50,
        style: styles.section,
        labelStyle: styles.sectionLabel,
        separatorsStyle: styles.seperator,
      },
      {
        items: CHORD_EXTENSIONS,
        onChange: (item: string) => setChordExtension(item),
        initialValue: chordExtension,
        label: 'Extension',
        align: WheelPickerAlign.RIGHT,
        faderProps: { size: 0 },
        itemHeight: 50,
        style: styles.rightSection,
        labelStyle: styles.sectionLabel,
        separatorsStyle: styles.seperator,
      },
    ];
  }, [setRootNote, setChordExtension]);

  return (
    <Modal
      isVisible={isWheelOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
      style={{ margin: 0 }}
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.container}>
        <StyledText style={styles.title}>Key Signature</StyledText>
        <View style={styles.line} />
        <SectionsWheelPicker
          numberOfVisibleRows={5}
          sections={sections}
          textStyle={styles.wheelText}
        />
      </View>
    </Modal>
  );
};

export default ChordWheelModal;
