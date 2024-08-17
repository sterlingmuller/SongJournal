import { combineReducers } from 'redux';

import songsReducer from '@src/state/slice/songsSlice';
import pagesReducer from '@src/state/slice/pagesSlice';
import asyncReducer from '@src/state/slice/asyncSlice';
import currentSongReducer from '@src/state/slice/currentSongSlice';
import playbackReducer from '@src/state/slice/playbackSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  pages: pagesReducer,
  async: asyncReducer,
  currentSong: currentSongReducer,
  playback: playbackReducer,
});

export default rootReducer;
