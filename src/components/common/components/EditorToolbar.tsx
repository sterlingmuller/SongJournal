import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { LyricsSection } from '../enums';
import useTextEditorStyles from '@src/styles/textEditor';
import { insertAtCursor } from '@src/utils/textEditorUtils';
import UndoIcon from '@src/icons/UndoIcon';
import BoldIcon from '@src/icons/BoldIcon';
import ItalicIcon from '@src/icons/ItalicIcon';
import HyphenIcon from '@src/icons/HyphenIcon';

interface EditorToolbarProps {
  localText: string;
  setLocalText: (value: string) => void;
  setIsWheelOpen: (value: boolean) => void;
  selection: { start: number; end: number };
  onTextSection: (section: LyricsSection) => void;
  onGerundConvert: () => void;
  onUndo: () => void;
  isUndoDisabled: boolean;
  setToolbarHeight: (height: number) => void;
}

const EditorToolbar = ({
  localText,
  setLocalText,
  setIsWheelOpen,
  selection,
  onTextSection,
  onGerundConvert,
  onUndo,
  isUndoDisabled,
  setToolbarHeight,
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

  const onLayoutHeader = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setToolbarHeight(height);
  };

  return (
    <View style={styles.toolbarContainer} onLayout={onLayoutHeader}>
      <View style={styles.buttonGroup}>
        <View style={styles.textButtons}>
          <TouchableOpacity
            onPress={onUndo}
            style={styles.button}
            disabled={isUndoDisabled}
            hitSlop={{ top: 5, bottom: 5, left: 0, right: 0 }}
          >
            <UndoIcon isDisabled={isUndoDisabled} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onBold}
            style={styles.button}
            hitSlop={{ top: 5, bottom: 5, left: 0, right: 0 }}
          >
            <BoldIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onItalic}
            style={styles.button}
            hitSlop={{ top: 5, bottom: 5, left: 0, right: 0 }}
          >
            <ItalicIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.separatorBar} />
        <View style={styles.shortcutButtons}>
          <TouchableOpacity
            onPress={onGerundConvert}
            style={styles.smallFixedWidthButton}
            hitSlop={{ top: 10, bottom: 10, left: 0, right: 0 }}
          >
            <Text style={styles.shortcutText}>-in&apos;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onHyphen}
            style={styles.smallFixedWidthButton}
            hitSlop={{ top: 10, bottom: 10, left: 0, right: 0 }}
          >
            <HyphenIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onAddChord}
            style={styles.fixedWidthButton}
            hitSlop={{ top: 10, bottom: 10, left: 0, right: 0 }}
          >
            <Text style={styles.shortcutText}>Chords</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleSections}
            style={styles.fixedWidthButton}
            hitSlop={{ top: 10, bottom: 10, left: 0, right: 0 }}
          >
            <Text style={styles.shortcutText}>Sections</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isSectionsOpen && (
        <AnimatedView style={[styles.sectionPicker, animatedStyles]}>
          {Object.values(LyricsSection).map((section: LyricsSection) => (
            <TouchableOpacity
              key={section}
              style={styles.sectionButton}
              onPress={() => handleSectionPress(section)}
              hitSlop={{ top: 0, bottom: 0, left: 5, right: 5 }}
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
