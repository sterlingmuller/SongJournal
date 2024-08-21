import { Button, View } from 'react-native';

import useSortByModalStyles from '@src/styles/sortByModal';

interface Props {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const FilterToggle = ({ label, isActive, onPress }: Props) => {
  const styles = useSortByModalStyles();

  return (
    <View
      style={[
        styles.filterToggle,
        isActive ? styles.activeToggle : styles.inactiveToggle,
      ]}
    >
      <Button title={label} onPress={onPress} />
    </View>
  );
};

export default FilterToggle;
