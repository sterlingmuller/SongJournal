import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import {
  SectionsWheelPicker,
  WheelPickerAlign,
  WheelPickerProps,
  Fader,
} from 'react-native-ui-lib';
import Modal from 'react-native-modal';

import { ROOT_NOTES, CHORD_EXTENSIONS } from '@src/common/enums';
import useWheelPickerModalStyles from '@src/styles/wheelPickerModal';
import StyledText from '@src/common/components/StyledText';

interface Props {
  isWheelOpen: boolean;
  setIsWheelOpen: (value: boolean) => void;
}

const ChordWheelModal = (props: Props) => {
  const { isWheelOpen, setIsWheelOpen } = props;
  const styles = useWheelPickerModalStyles();

  const [rootNote, setRootNote] = useState('');
  const [chordExtension, setChordExtension] = useState('');

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
      onBackdropPress={() => setIsWheelOpen(false)}
      style={{ margin: 0 }}
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
