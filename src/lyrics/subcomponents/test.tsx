import React from 'react';
import { View, TouchableOpacity } from 'react-native'; // Import necessary components
import EditIcon from './EditIcon'; // Replace with your actual icon components
import ChordsIcon from './ChordsIcon';
import MetronomeIcon from './MetronomeIcon';
import ShareIcon from './ShareIcon';

interface Props {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const options = [
  { name: 'edit', icon: EditIcon },
  { name: 'chords', icon: ChordsIcon },
  { name: 'metronome', icon: MetronomeIcon },
  { name: 'share', icon: ShareIcon },
];

const OptionsBar = ({ selectedOption, setSelectedOption }: Props) => {
  const handleOptionPress = (optionName: string) => {
    setSelectedOption(optionName === selectedOption ? '' : optionName); // Toggle selection
  };

  return (
    <View style={styles.options}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.name}
          style={[
            styles.iconButton,
            selectedOption === option.name && styles.selected,
          ]}
          onPress={() => handleOptionPress(option.name)}
        >
          {<option.icon />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionsBar;
