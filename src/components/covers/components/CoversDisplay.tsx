import React, { useCallback, memo, useState } from 'react';
import { View } from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectCoverSongs } from '@src/state/selectors/songsSelector';
import { selectArtistsWithCovers } from '@src/state/selectors/artistsSelector';
import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { DeleteObject } from '@src/components/common/types';
import { MessageIntent } from '@src/components/common/enums';
import ArtistCard from '../subcomponents/ArtistCard';
import CoverSongList from '../subcomponents/CoverSongList';
import useCoversStyle from '@src/styles/covers';

interface Props {
  setToDelete: (value: DeleteObject | null) => void;
  setTitleToEdit: (value: { songTitle: string; songId: number }) => void;
}

interface ArtistWithCoverCount {
  artistId: number;
  name: string;
  coverCount: number;
}

interface ArtistItemProps {
  artist: ArtistWithCoverCount;
  songs: Array<any>;
  isExpanded: boolean;
  onPress: (artistId: number) => void;
  setToDelete: (value: DeleteObject | null) => void;
  setTitleToEdit: (value: { songTitle: string; songId: number }) => void;
}

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

const CoversDisplay = ({ setToDelete, setTitleToEdit }: Props) => {
  const styles = useCoversStyle();
  const artists = useAppSelector(selectArtistsWithCovers);
  const allCoverSongs = useAppSelector(selectCoverSongs);
  const [expandedArtistId, setExpandedArtistId] = useState<number | null>(null);

  if (artists.length === 0) {
    return <ComposerMessage messageIntent={MessageIntent.GET_STARTED_HOME} />;
  }

  const handleArtistPress = useCallback((artistId: number) => {
    setExpandedArtistId(current => current === artistId ? null : artistId);
  }, []);

  const renderItem = useCallback(({ item: artist }: ListRenderItemInfo<ArtistWithCoverCount>) => {
    const artistSongs = allCoverSongs.filter(song => song.artistId === artist.artistId);
    return (
      <ArtistItem
        artist={artist}
        songs={artistSongs}
        isExpanded={artist.artistId === expandedArtistId}
        onPress={handleArtistPress}
        setToDelete={setToDelete}
        setTitleToEdit={setTitleToEdit}
      />
    );
  }, [allCoverSongs, expandedArtistId, handleArtistPress, setToDelete, setTitleToEdit]);

  return (
    <View style={styles.container}>
      <FlashList
        data={artists}
        renderItem={renderItem}
        estimatedItemSize={100}
        contentContainerStyle={styles.artistFlashContainer}
        keyExtractor={(item) => item.artistId.toString()}
        extraData={expandedArtistId}
      />
    </View>
  );
};

export default CoversDisplay;
