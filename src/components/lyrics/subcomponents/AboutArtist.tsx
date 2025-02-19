import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import SettingsWheel from '@src/components/common/components/SettingsWheel';
import StyledText from '@src/components/common/components/StyledText';
import NewArtistModal from '@src/components/settings/components/NewArtistModal';
import useInfoModalStyle from '@src/styles/infoModal';
import { useArtistName } from '@src/utils/hooks/useArtistName';

interface Props {
  selectedArtistId: number;
  setSelectedArtistId: (value: number) => void;
}

const AboutArtist = ({ selectedArtistId, setSelectedArtistId }: Props) => {
  const styles = useInfoModalStyle();
  const { getArtistName, artistItems } = useArtistName();

  const [isSettingsWheelOpen, setIsSettingsWheelOpen] = useState(false);
  const [isNewArtistOpen, setIsNewArtistOpen] = useState(false);

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
        <TouchableOpacity onPress={() => setIsNewArtistOpen(true)} hitSlop={20}>
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
