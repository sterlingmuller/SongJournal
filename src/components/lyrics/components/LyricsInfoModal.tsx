import React from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import Modal from 'react-native-modal';

import useInfoModalStyle from '@src/styles/infoModal';
import {
  BulletPoint,
  HyphenPoint,
} from '@src/components/common/components/TextFormatting';
import HyphenIcon from '@src/icons/HyphenIcon';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
}

const LyricsInfoModal = (props: Props) => {
  const { isInfoModalOpen, setIsInfoModalOpen } = props;
  const styles = useInfoModalStyle();

  const onExitPress = () => {
    setIsInfoModalOpen(false);
  };

  return (
    <Modal
      isVisible={isInfoModalOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
      style={styles.modal}
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Lyric Editor Shortcuts</Text>
        <ScrollView
          style={{ width: '80%' }}
          contentContainerStyle={{ paddingRight: 10, paddingBottom: 30 }}
        >
          <Text style={styles.sectionTitle}>-in&apos;</Text>
          <BulletPoint>
            Replaces <Text style={styles.italic}>-ing</Text> endings with{' '}
            <Text style={styles.italic}>-in&apos;</Text>.
          </BulletPoint>
          <Text style={styles.exampleText}>Running → Runnin&apos;</Text>
          <BulletPoint>
            Applies change when cursor is on any word, ending with{' '}
            <Text style={styles.italic}>-ing</Text>.
          </BulletPoint>
          <View style={styles.hyphenContainer}>
            <HyphenIcon />
          </View>
          <BulletPoint>Inserts a hyphen at your cursor.</BulletPoint>
          <BulletPoint>
            Helpful when adding multiple chords to a single word.
          </BulletPoint>
          <Text
            style={[styles.exampleText, { paddingTop: 4, paddingBottom: 0 }]}
          >{`   Em  C  G  D\n`}</Text>
          <Text style={styles.exampleText}>{`but not me ba-by`}</Text>
          {Platform.OS === 'ios' && <BulletPoint>Long-pressing the text will bring up a magnifier, you can then drag to place your cursor exactly where you want.</BulletPoint>}
          <Text style={styles.sectionTitle}>Chords</Text>
          <BulletPoint>Opens the Chord Generator Wheel.</BulletPoint>
          <BulletPoint>The chord will be inserted:</BulletPoint>
          <HyphenPoint>
            Above the start of the current word or hyphenated segment
          </HyphenPoint>
          <HyphenPoint>
            At the cursor if no lyrics exist on the current line
          </HyphenPoint>

          <Text style={styles.sectionTitle}>Sections</Text>
          <BulletPoint>
            Allows you to insert sections such as Verse, Chorus, or Bridge.
          </BulletPoint>
          <BulletPoint>The section will be inserted:</BulletPoint>
          <HyphenPoint>
            Below the current line if cursor is at end of line
          </HyphenPoint>
          <HyphenPoint>
            Above the current line if cursor is elsewhere
          </HyphenPoint>

          <Text style={styles.sectionTitle}>Additional Features:</Text>
          {Platform.OS === 'android' && <BulletPoint>Shake your phone to revert your lyrics sheet to its last save</BulletPoint>}
          <BulletPoint>Undo inputs</BulletPoint>
          <BulletPoint>Bold or italicize text</BulletPoint>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default LyricsInfoModal;
