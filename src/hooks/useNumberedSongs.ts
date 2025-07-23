import { Songs, Song } from '@src/components/common/types';

export const useNumberedSongs = () => {
  const numberSongs = (songs: Songs) => {
    const indexMap = new Map(
      [...songs]
        .sort((a: Song, b: Song) => a.songId - b.songId)
        .map((song: Song, index: number) => [song.songId, index + 1])
    );

    return songs.map((song: Song) => ({
      ...song,
      orderNumber: indexMap.get(song.songId),
    }));
  };

  return numberSongs;
};
