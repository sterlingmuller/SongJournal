import React, { useCallback, memo } from 'react';
import { View } from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectCoverSongs } from '@src/state/selectors/songsSelector';
import { selectArtistsWithCovers } from '@src/state/selectors/artistsSelector';
import ComposerMessage from '@src/components/common/components/ComposerMessage';
import {
  ArtistWithCoverCount,
  DeleteObject,
} from '@src/components/common/types';
import { MessageIntent } from '@src/components/common/enums';
import ArtistItem from '../subcomponents/ArtistItem';
import useCoversStyle from '@src/styles/covers';

interface Props {
  setToDelete: (value: DeleteObject | null) => void;
  setTitleToEdit: (value: { songTitle: string; songId: number }) => void;
  expandedArtistId: number;
  setExpandedArtistId: (id: number) => void;
}

const CoversDisplay = ({
  setToDelete,
  setTitleToEdit,
  expandedArtistId,
  setExpandedArtistId,
}: Props) => {
  const styles = useCoversStyle();
  const artists = useAppSelector(selectArtistsWithCovers);
  const allCoverSongs = useAppSelector(selectCoverSongs);

  const handleArtistPress = useCallback(
    (artistId: number) => {
      setExpandedArtistId(artistId === expandedArtistId ? -1 : artistId);
    },
    [setExpandedArtistId, expandedArtistId]
  );

  const renderItem = useCallback(
    ({ item: artist }: ListRenderItemInfo<ArtistWithCoverCount>) => {
      const artistSongs = allCoverSongs
        .filter(song => song.artistId === artist.artistId)
        .sort((a, b) => a.title.localeCompare(b.title));
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
    },
    [
      allCoverSongs,
      expandedArtistId,
      handleArtistPress,
      setToDelete,
      setTitleToEdit,
    ]
  );

  if (artists.length === 0) {
    return (
      <ComposerMessage messageIntent={MessageIntent.COVERS_INSTRUCTIONS} />
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={artists}
        renderItem={renderItem}
        estimatedItemSize={100}
        contentContainerStyle={styles.artistFlashContainer}
        keyExtractor={item => item.artistId.toString()}
        extraData={expandedArtistId}
      />
    </View>
  );
};

export default memo(CoversDisplay);
