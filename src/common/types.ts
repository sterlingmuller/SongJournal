export type sortByCategoryName = 'Date' | 'Name' | 'Length' | 'Lyrics';

export type colorThemeName = 'Light' | 'Dark' | 'Metal' | 'Psych' | 'Pop' | 'Twee';

export type RootStackParamList = {
  Home: undefined;
  CurrentSongFolder: { currentSong: string };
  Lyrics: { currentSong: string };
  Settings: undefined;
  MusicPlayer: undefined;
};
