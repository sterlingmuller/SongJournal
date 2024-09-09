import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { Artist } from '@src/components/common/types';
import { selectArtists } from '@src/state/selectors/artistsSelector';

export const useArtistName = () => {
  const artists = useAppSelector(selectArtists);

  const defaultArtistOption = { label: '--', value: -1 };

  const artistItems = [
    defaultArtistOption,
    ...artists.map((artist: Artist) => ({
      label: artist.name,
      value: artist.artistId,
    })),
  ];

  const getArtistName = (id: number) =>
    artists.find((artist: Artist) => artist.artistId === id)?.name || '';

  return { getArtistName, artistItems };
};
