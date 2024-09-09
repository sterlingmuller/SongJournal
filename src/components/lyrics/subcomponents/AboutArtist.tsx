import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import SettingsWheel from '@src/components/common/components/SettingsWheel';
import StyledText from '@src/components/common/components/StyledText';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectArtists } from '@src/state/selectors/artistsSelector';
import { Artist } from '@src/components/common/types';
import NewArtistModal from '@src/components/settings/components/NewArtistModal';
import useInfoModalStyle from '@src/styles/infoModal';

interface Props {
  selectedArtistId: number;
  setSelectedArtistId: (value: number) => void;
}

const AboutArtist = ({ selectedArtistId, setSelectedArtistId }: Props) => {
  const styles = useInfoModalStyle();
  const artists = useAppSelector(selectArtists);

  const [isSettingsWheelOpen, setIsSettingsWheelOpen] = useState(false);
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
    getArtistName(selectedArtistId),
  );

  const handleInputChange = (value: number) => {
    setSelectedArtistId(value);

    const selectedArtistName = getArtistName(value);
    setDisplayedArtistName(selectedArtistName);
  };

  const onExitPress = () => {
    setIsSettingsWheelOpen(false);
  };

  return (
    <>
      <View style={styles.artistContainer}>
        <View style={styles.artistSelectContainer}>
          <TouchableOpacity
            onPress={() => setIsSettingsWheelOpen(true)}
            style={styles.artistTextbox}
          >
            <StyledText>{displayedArtistName}</StyledText>
          </TouchableOpacity>
          <StyledText>Artist</StyledText>
        </View>
        <TouchableOpacity onPress={() => setIsNewArtistOpen(true)}>
          <StyledText style={styles.artistEditText}>+ Add or Edit</StyledText>
        </TouchableOpacity>
      </View>
      <SettingsWheel
        isWheelOpen={isSettingsWheelOpen}
        onExitPress={onExitPress}
        handleInputChange={handleInputChange}
        initialValue={selectedArtistId}
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

export default AboutArtist;
