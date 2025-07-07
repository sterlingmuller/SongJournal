import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import usePreferencesStyle from '@src/styles/preferences';
import StyledText from '@src/components/common/components/StyledText';
import { useAppDispatch } from '@src/hooks/typedReduxHooks';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import { useArtistName } from '@src/hooks/useArtistName';
import { useColorTheme } from '@src/state/context/ThemeContext';
import SettingsWheel from '@src/components/common/components/SettingsWheel';
import NewArtistModal from '../components/NewArtistModal';

interface Props {
  defaultArtistId: number;
}

const DefaultArtistOptions = ({ defaultArtistId }: Props) => {
  const styles = usePreferencesStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { getArtistName, artistItems } = useArtistName();
  const { theme } = useColorTheme();

  const [isSettingsWheelOpen, setIsSettingsWheelOpen] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState(defaultArtistId);
  const [isNewArtistOpen, setIsNewArtistOpen] = useState(false);

  const [displayedArtistName, setDisplayedArtistName] = useState(
    getArtistName(defaultArtistId),
  );

  const handleInputChange = (value: number) => {
    setSelectedArtistId(value);

    const selectedArtistName = getArtistName(value);
    setDisplayedArtistName(selectedArtistName);
  };

  const onExitPress = () => {
    if (defaultArtistId !== selectedArtistId) {
      dispatch(
        updateSettingsRequest({
          db,
          updatedSettings: { defaultArtistId: selectedArtistId },
        }),
      );
    }

    setIsSettingsWheelOpen(false);
  };

  return (
    <>
      <View style={styles.sortSettingsContainer}>
        <View style={styles.selectContainer}>
          <StyledText style={styles.optionText}>Default Artist:</StyledText>
          <TouchableOpacity
            onPress={() => setIsSettingsWheelOpen(true)}
            style={styles.textbox}
          >
            <StyledText
              style={[
                styles.inputText,
                !displayedArtistName && { color: theme.placeholderText },
              ]}
            >
              {displayedArtistName || '--'}
            </StyledText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsNewArtistOpen(true)}  hitSlop={10}>
          <StyledText style={styles.addArtistText}>
            + Add or Edit
          </StyledText>
        </TouchableOpacity>
      </View>
      {isSettingsWheelOpen && <SettingsWheel
        onExitPress={onExitPress}
        handleInputChange={handleInputChange}
        initialValue={defaultArtistId}
        label={'Default Artist'}
        items={artistItems}
      />}
      {isNewArtistOpen && <NewArtistModal
        setIsNewArtistOpen={setIsNewArtistOpen}
      />}
    </>
  );
};

export default DefaultArtistOptions;
