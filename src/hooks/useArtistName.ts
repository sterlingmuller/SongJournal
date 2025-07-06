import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { Artist } from '@src/components/common/types';
import { selectArtists } from '@src/state/selectors/artistsSelector';
import { useCallback, useMemo } from 'react';

export const useArtistName = () => {
  const artists = useAppSelector(selectArtists);

  // Memoize the artist lookup map for O(1) access
  const artistMap = useMemo(() => {
    const map = new Map<number, string>();
    artists.forEach((artist: Artist) => {
      map.set(artist.artistId, artist.name);
    });
    return map;
  }, [artists]);

  // Memoize default option outside the hook to prevent recreation
  const defaultArtistOption = useMemo(() => ({ label: '--', value: -1 }), []);

  // Memoize artist items with optimized generation
  const artistItems = useMemo(() => {
    if (artists.length === 0) {
      return [defaultArtistOption];
    }

    const items = new Array(artists.length + 1);
    items[0] = defaultArtistOption;

    artists.forEach((artist: Artist, index: number) => {
      items[index + 1] = {
        label: artist.name,
        value: artist.artistId,
      };
    });

    return items;
  }, [artists, defaultArtistOption]);

  // Use O(1) lookup instead of O(n) find
  const getArtistName = useCallback(
    (id: number) => artistMap.get(id) || '',
    [artistMap]
  );

  return { getArtistName, artistItems };
};
