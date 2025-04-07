import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { Artist } from '@src/components/common/types';
import { selectArtists } from '@src/state/selectors/artistsSelector';
import { useCallback, useMemo } from 'react';

export const useArtistName = () => {
  const artists = useAppSelector(selectArtists);

  const defaultArtistOption = useMemo(() => ({ label: '--', value: -1 }), []);

  const artistItems = useMemo(() => {
    return [
      defaultArtistOption,
      ...artists.map((artist: Artist) => ({
        label: artist.name,
        value: artist.artistId,
      })),
    ];
  }, [artists, defaultArtistOption]);

  const getArtistName = useCallback(
    (id: number) =>
      artists.find((artist: Artist) => artist.artistId === id)?.name || '',
    [artists],
  );

  return { getArtistName, artistItems };
};
