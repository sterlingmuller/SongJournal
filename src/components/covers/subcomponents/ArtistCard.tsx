import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Artist } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import ArrowDownIcon from '@src/icons/ArrowDownIcon';
import ArrowUpIcon from '@src/icons/ArrowUpIcon';
import useCoversStyle from '@src/styles/covers';

interface Props {
  artist: Artist & { coverCount: number };
  isExpanded: boolean;
  onPress: () => void;
}

const ArtistCard = ({ artist, isExpanded, onPress }: Props) => {
  const styles = useCoversStyle();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <View style={styles.titleSection}>
          <StyledText style={styles.artistName}>
            {artist.name}
          </StyledText>
          <StyledText style={styles.coverCount}>
            {artist.coverCount} {artist.coverCount === 1 ? 'song' : 'songs'}
          </StyledText>
        </View>
        {isExpanded ? (
          <ArrowUpIcon />
        ) : (
          <ArrowDownIcon />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;
