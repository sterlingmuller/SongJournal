import React, { useCallback } from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import { COLOR_THEME_OPTIONS } from '@src/components/common/constants';
import ColorThemeOption from '@src/components/settings/subcomponents/ColorThemeOption';
import useSettingsStyle from '@src/styles/settings';
import { ColorTheme } from '@src/components/common/enums';
import { FlashList } from '@shopify/flash-list';

const Theme = () => {
  const styles = useSettingsStyle();

  const renderColorThemeOption = useCallback(
    ({ item }: { item: ColorTheme }) => (
      <ColorThemeOption key={item} label={item} />
    ),
    [],
  );

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Theme</StyledText>
      <FlashList
        data={COLOR_THEME_OPTIONS}
        renderItem={renderColorThemeOption}
        keyExtractor={(item: ColorTheme) => item}
        estimatedItemSize={30}
      />
    </View>
  );
};

export default Theme;
