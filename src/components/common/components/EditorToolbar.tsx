import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { LyricsSection } from '../enums';

interface EditorToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onTextSection: (value: boolean) => void;
  onAddChord: () => void;
}

const EditorToolbar = ({
  onBold,
  onItalic,
  onTextSection,
  onAddChord,
}: EditorToolbarProps) => {
  const [showSizes, setShowSizes] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Formatting Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={onBold} style={styles.button}>
          {/* <Bold width={24} height={24} color="#333" /> */}
          <Text>B</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onItalic} style={styles.button}>
          <Text>I</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onAddChord} style={styles.button}>
          <Text>Chords</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowSizes(!showSizes)}
          style={styles.button}
        >
          <Text>Sections</Text>
        </TouchableOpacity>
      </View>

      {/* Text Size Picker (appears when activated) */}
      {showSizes && (
        <View style={styles.sizePicker}>
          {Object.values(LyricsSection).map((section) => (
            <TouchableOpacity
              key={section}
              style={styles.sizeButton}
              onPress={() => {
                // onSelect(section);
                // onClose();
              }}
            >
              <Text style={styles.sizeText}>
                {section.replace(/[\[\]]/g, '')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
    borderRadius: 15,
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
    // left: 0,
    right: 5,
    maxWidth: '40%',
    backgroundColor: 'white',
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
    width: '100%', // Make buttons take full width
  },
  sizeText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditorToolbar;
