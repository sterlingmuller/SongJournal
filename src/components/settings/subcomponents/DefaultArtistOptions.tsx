import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import usePreferencesStyle from '@src/styles/preferences';
import SettingsWheel from '@src/components/common/components/SettingsWheel';
import StyledText from '@src/components/common/components/StyledText';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import { selectArtists } from '@src/state/selectors/artistsSelector';
import { Artist } from '@src/components/common/types';
import NewArtistModal from '../components/NewArtistModal';

interface Props {
  defaultArtistId: number;
}

const DefaultArtistOptions = ({ defaultArtistId }: Props) => {
  const styles = usePreferencesStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const artists = useAppSelector(selectArtists);

  const [isSettingsWheelOpen, setIsSettingsWheelOpen] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState(defaultArtistId);
  const [isNewArtistOpen, setIsNewArtistOpen] = useState(false);

  const defaultArtistOption = { label: '--', value: -1 };

  const artistItems = [
    defaultArtistOption,
    ...artists.map((artist: Artist) => ({
      label: artist.name,
      value: artist.artistId,
    })),
  ];

  const getArtistName = (id: number) =>
    artists.find((artist: Artist) => artist.artistId === id)?.name || '--';

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
