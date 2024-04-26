export type sortByCategoryName = 'Date' | 'Name' | 'Length' | 'Lyrics';

export type colorThemeName =
  | 'Light'
  | 'Dark'
  | 'Metal'
  | 'Psych'
  | 'Pop'
  | 'Twee';

export type RootStackParamList = {
  Home: undefined;
  CurrentSongFolder: { song: song };
  Lyrics: { song: song };
  Settings: undefined;
  MusicPlayer: undefined;
};

export type take = {
  key: number;
  title: string;
  date: string;
  notes?: string;
  starred: boolean;
};

export type page = {
  lyrics?: string;
  details?: string;
  bpm?: number;
  key?: string;
  time?: string;
  completed: boolean;
};

export type song = {
  key: number;
  title: string;
  selectedTake: number;
  takes: take[];
  page: page;
};

export type songs = song[];
