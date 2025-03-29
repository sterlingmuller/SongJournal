import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LyricsSection } from '../enums';

export const SectionPickerModal = ({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (section: string) => void;
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {Object.values(LyricsSection).map((section) => (
            <TouchableOpacity
              key={section}
              style={styles.sectionItem}
              onPress={() => {
                onSelect(section);
                onClose();
              }}
            >
              <Text style={styles.sectionText}>
                {section.replace(/[\[\]]/g, '')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Section Picker
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 16,
  },
  sectionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  sectionText: {
    fontSize: 16,
    textAlign: 'center',
  },

  // Section Header Display
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1a73e8',
    marginTop: 24,
    marginBottom: 8,
  },
});
