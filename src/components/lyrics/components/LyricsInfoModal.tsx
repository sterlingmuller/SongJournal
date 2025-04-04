import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import useInfoModalStyle from '@src/styles/infoModal';
import {
  BulletPoint,
  HyphenPoint,
} from '@src/components/common/components/TextFormatting';

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
          <Text style={styles.sectionTitle}>Hyphen Shortcut:</Text>
          <BulletPoint>Inserts a hyphen at your cursor.</BulletPoint>
          <BulletPoint>
            Helpful when adding multiple chords to a single word.
          </BulletPoint>
          <Text
            style={[styles.exampleText, { paddingTop: 4, paddingBottom: 0 }]}
          >{`   Em  C  G  D\n`}</Text>
          <Text style={styles.exampleText}>{`but not me ba-by`}</Text>

          <Text style={styles.sectionTitle}>Chords:</Text>
          <BulletPoint>Opens the Chord Generator Wheel.</BulletPoint>
          <BulletPoint>The chord will be inserted:</BulletPoint>
          <HyphenPoint>
            Above the start of the current word or hyphenated segment
          </HyphenPoint>
          <HyphenPoint>
            At the cursor if no lyrics exist on the current line
          </HyphenPoint>

          <Text style={styles.sectionTitle}>Song Sections:</Text>
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

          <Text style={styles.sectionTitle}>-in' Shortcut:</Text>
          <BulletPoint>Replaces -ing endings with -in'.</BulletPoint>
          <Text style={styles.exampleText}>Running → Runnin'</Text>
          <BulletPoint>
            Works when cursor is on any word ending with -ing.
          </BulletPoint>

          <Text style={styles.sectionTitle}>Additional Features:</Text>
          <BulletPoint>Undo inputs</BulletPoint>
          <BulletPoint>Bold or italicize text</BulletPoint>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default LyricsInfoModal;
