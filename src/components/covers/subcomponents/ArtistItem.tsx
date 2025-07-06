import React, { useCallback, memo } from 'react';
import { View } from 'react-native';
import useCoversStyle from '@src/styles/covers';
import ArtistCard from '../components/ArtistCard';
import CoverSongList from './CoverSongList';
import { ArtistItemProps } from '@src/components/common/types';

const ArtistItem = memo(({ artist, songs, isExpanded, onPress, setToDelete, setTitleToEdit }: ArtistItemProps) => {
  const styles = useCoversStyle();

  const handlePress = useCallback(() => {
    onPress(artist.artistId);
  }, [artist.artistId, onPress]);

  return (
    <View style={styles.artistSection}>
      <ArtistCard
        artist={artist}
        isExpanded={isExpanded}
        onPress={handlePress}
      />
      {isExpanded && (
          <CoverSongList
            setToDelete={setToDelete}
            setTitleToEdit={setTitleToEdit}
            songs={songs}
          />
      )}
    </View>
  );
});

export default ArtistItem;