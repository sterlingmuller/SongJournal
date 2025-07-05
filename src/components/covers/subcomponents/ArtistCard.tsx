import React, { useRef, useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import useCoversStyle from '@src/styles/covers';



interface Props {

}

const ArtistCard = ({}: Props) => {
  const styles = useCoversStyle();

  return (
    <TouchableOpacity
      style={styles.artistCard}
    >
 <View style={styles.contents}>
        <TouchableOpacity
          onPress={() => handleOnPressNavigation(Screen.SONG)}
          onLongPress={handleLongPress}
          delayLongPress={250}
          testID="Song_Folder-Title"
          style={styles.titleContainer}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <StyledText style={styles.title}>{renderTitle()}</StyledText>
        </TouchableOpacity>
        <View style={styles.subtextContainer}>
          <StyledText style={styles.trackSubtext}>
          {formatDateFromISOString(song.creationDate)}
          </StyledText>
          <StyledText style={styles.trackSubtext}>{durationText}</StyledText>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => handleOnPressNavigation(Screen.LYRICS)}
            style={{ paddingBottom: 4, }}
            hitSlop={{ top: 10, bottom: 15, left: 10, right: 10 }}
          >
            <PageIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            hitSlop={{ top: 15, bottom: 20, left: 10, right: 10 }}
            disabled={shareDisabled}
          >
            {!shareDisabled && <ShareIcon size={34} />}
          </TouchableOpacity>
          {selectedTake &&
            (selectedPlayingSongId === songId ? (
              <PlaybackBar
                duration={selectedTake ? selectedTake.duration : 0}
              />
            ) : (
              <View style={styles.staticPlaybackBar} />
            ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ArtistCard);
