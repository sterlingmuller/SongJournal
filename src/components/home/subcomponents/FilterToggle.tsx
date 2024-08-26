import { Switch, View } from 'react-native';

import useSortByModalStyles from '@src/styles/sortByModal';
import StyledText from '@src/components/common/components/StyledText';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Props {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const FilterToggle = ({ label, isActive, onPress }: Props) => {
  const styles = useSortByModalStyles();
  const { theme } = useColorTheme();

  return (
    <View style={styles.filterToggle}>
      <StyledText style={styles.toggleLabel}>{label}</StyledText>
      <Switch
        value={isActive}
        onValueChange={onPress}
        trackColor={{ false: theme.highlight, true: theme.mutedPrimary }}
        thumbColor={isActive ? theme.primary : '#f4f3f4'}
      />
    </View>
  );
};

export default FilterToggle;
