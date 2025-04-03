import React from 'react';
import { View, TouchableOpacity, Text, Keyboard, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { LyricsSection } from '../enums';
import useTextEditorStyles from '@src/styles/textEditor';
import { insertAtCursor } from '@src/utils/textEditorUtils';

interface EditorToolbarProps {
  localText: string;
  setLocalText: (value: string) => void;
  setIsWheelOpen: (value: boolean) => void;
  selection: { start: number; end: number };
  onTextSection: (section: LyricsSection) => void;
  onGerundConvert: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

const EditorToolbar = ({
  localText,
  setLocalText,
  setIsWheelOpen,
  selection,
  onTextSection,
  onGerundConvert,
  onUndo,
  canUndo,
}: EditorToolbarProps) => {
  const styles = useTextEditorStyles();
  const [isSectionsOpen, setIsSectionsOpen] = React.useState(false);
  const AnimatedView = Animated.createAnimatedComponent(View);
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  const animateSections = (show: boolean) => {
    const duration = 250;
    translateY.value = withTiming(show ? 0 : 100, {
      duration,
      easing: Easing.out(Easing.ease),
    });
    opacity.value = withTiming(show ? 1 : 0, { duration });
  };

  const onBold = () => {
    setLocalText(insertAtCursor(localText, selection, '**', '**', true));
  };
  const onItalic = () => {
    setLocalText(insertAtCursor(localText, selection, '*', '*', true));
  };
  const onHyphen = () => {
    setLocalText(insertAtCursor(localText, selection, '-'));
  };
  const onAddChord = () => setIsWheelOpen(true);

  const toggleSections = () => {
    if (isSectionsOpen) {
      animateSections(false);
      setIsSectionsOpen(false);
    } else {
      Keyboard.dismiss();
      const delay = Platform.OS === 'ios' ? 250 : 150;
      setTimeout(() => {
        animateSections(true);
        setIsSectionsOpen(true);
      }, delay);
    }
  };

  const handleSectionPress = (section: LyricsSection) => {
    onTextSection(section);
    animateSections(false);
    setIsSectionsOpen(false);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.toolbarContainer}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={onUndo}
          style={styles.button}
          disabled={!canUndo}
        >
          <Text style={{ opacity: canUndo ? 1 : 0.3, fontWeight: 'bold' }}>
            {'<--'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBold} style={styles.button}>
          <Text>B</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onItalic} style={styles.button}>
          <Text>I</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onHyphen} style={styles.button}>
          <Text>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAddChord} style={styles.button}>
          <Text>Chords</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSections} style={styles.button}>
          <Text>Song Sections</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onGerundConvert} style={styles.button}>
          <Text>-in'</Text>
        </TouchableOpacity>
      </View>
      {isSectionsOpen && (
        <AnimatedView style={[styles.sectionPicker, animatedStyles]}>
          {Object.values(LyricsSection).map((section: LyricsSection) => (
            <TouchableOpacity
              key={section}
              style={styles.sectionButton}
              onPress={() => handleSectionPress(section)}
              hitSlop={10}
            >
              <Text style={styles.sectionText}>
                {section.replace(/[[\]]/g, '')}
              </Text>
            </TouchableOpacity>
          ))}
        </AnimatedView>
      )}
    </View>
  );
};

export default EditorToolbar;
