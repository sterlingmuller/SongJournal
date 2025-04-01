import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Keyboard,
  Platform,
} from 'react-native';
import { LyricsSection } from '../enums';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface EditorToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onHyphen: () => void;
  onTextSection: (section: LyricsSection) => void;
  onAddChord: () => void;
}

const EditorToolbar = ({
  onBold,
  onItalic,
  onHyphen,
  onTextSection,
  onAddChord,
}: EditorToolbarProps) => {
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
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
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
      </View>
      {isSectionsOpen && (
        <AnimatedView style={[styles.sizePicker, animatedStyles]}>
          {Object.values(LyricsSection).map((section: LyricsSection) => (
            <TouchableOpacity
              key={section}
              style={styles.sizeButton}
              onPress={() => handleSectionPress(section)}
              hitSlop={10}
            >
              <Text style={styles.sizeText}>
                {section.replace(/[[\]]/g, '')}
              </Text>
            </TouchableOpacity>
          ))}
        </AnimatedView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 6,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  button: {
    padding: 8,
    borderRadius: 4,
  },
  sizePicker: {
    position: 'absolute',
    bottom: 60,
    right: 5,
    maxWidth: '40%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: '100%',
  },
  sizeText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditorToolbar;
