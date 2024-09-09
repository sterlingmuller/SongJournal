import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import usePreferencesStyle from '@src/styles/preferences';
import SettingsWheel from '@src/components/common/components/SettingsWheel';
import StyledText from '@src/components/common/components/StyledText';
import { useAppDispatch } from '@src/utils/hooks/typedReduxHooks';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import NewArtistModal from '../components/NewArtistModal';
import { useArtistName } from '@src/utils/hooks/useArtistName';

interface Props {
  defaultArtistId: number;
}

const DefaultArtistOptions = ({ defaultArtistId }: Props) => {
  const styles = usePreferencesStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { getArtistName, artistItems } = useArtistName();

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
          <StyledText>Default Artist:</StyledText>
          <TouchableOpacity
            onPress={() => setIsSettingsWheelOpen(true)}
            style={styles.textbox}
          >
            <StyledText>{displayedArtistName}</StyledText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsNewArtistOpen(true)}>
          <StyledText style={styles.addArtistText}>
            + Add or Edit Artist
          </StyledText>
        </TouchableOpacity>
      </View>
      <SettingsWheel
        isWheelOpen={isSettingsWheelOpen}
        onExitPress={onExitPress}
        handleInputChange={handleInputChange}
        initialValue={defaultArtistId}
        label={'Default Artist'}
        items={artistItems}
      />
      <NewArtistModal
        isNewArtistOpen={isNewArtistOpen}
        setIsNewArtistOpen={setIsNewArtistOpen}
      />
    </>
  );
};

export default DefaultArtistOptions;
