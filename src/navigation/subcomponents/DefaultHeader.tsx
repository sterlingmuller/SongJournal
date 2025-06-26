import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '@src/icons/BackIcon';
import useNavigationHeaderStyles from '@src/styles/navigationHeader';
import { Screen } from '@src/components/common/enums';
import HeaderPageButton from '@src/components/songFolder/subcomponents/HeaderPageButton';

interface Props {
  title: string;
  screen?: Screen;
}

const DefaultHeader = ({ title, screen }: Props) => {
  const styles = useNavigationHeaderStyles();
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titlePlusArrow}>
        <TouchableOpacity onPress={goBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      </View>
      {screen === Screen.SONG &&
      <View style={{marginTop: -4}}>
        <HeaderPageButton />
        </View>}
    </View>
  );
};

export default DefaultHeader;
