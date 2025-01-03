export enum Screen {
  SONG = 'Song',
  RECORDING = 'Recording',
  HOME = 'Home',
  LYRICS = 'Lyrics',
  MUSIC_PLAYER = 'MusicPlayer',
  SETLIST = 'Setlist',
  SETTINGS = 'Settings',
  CONNECTION_SUCCESS = 'ConnectionSuccess',
}

export enum ColorTheme {
  LIGHT = 'Light',
  DARK = 'Dark - In Development',
  SURF = 'Surf',
  METAL = 'Metal - In Development',
  PSYCH = 'Psych - In Development',
  POP = 'Pop - In Development',
}

export enum SortBy {
  DATE = 'Date',
  LAST_UPDATED = 'Last Updated',
  NAME = 'Name',
  LENGTH = 'Length',
}

export enum Filter {
  COMPLETED = 'Completed',
  IN_PROGRESS = 'In Progress',
  LYRICS = 'Lyrics',
  LYRICLESS = 'Lyricless',
}

export enum SongDetailKey {
  KEY_SIGNATURE = 'keySignature',
  TIME = 'time',
  BPM = 'bpm',
}

export enum LyricsOption {
  EDIT = 'Edit',
  CHORDS = 'Chords',
  METRONOME = 'Metronome',
  SHARE = 'Share',
  NONE = '',
}

export enum ToggleableSettings {
  DISPLAY_TIPS = 'displayTips',
  IS_NUMBERED = 'isNumbered',
  IS_ASCENDING = 'isAscending',
}

export enum Conductor {
  EGG = 'EGG',
  BAD_EGG = 'BAD EGG',
  CACSUS = 'CACsus',
  DEAD_ADIM = 'DEAD Adim',
}
