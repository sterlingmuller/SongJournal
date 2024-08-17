import { combineReducers } from 'redux';

import songsReducer from '@src/slice/songsSlice';
import pagesReducer from '@src/slice/pagesSlice';
import asyncReducer from '@src/slice/asyncSlice';
import currentSongReducer from '@src/slice/currentSongSlice';
import playbackReducer from '@src/slice/playbackSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  pages: pagesReducer,
  async: asyncReducer,
  currentSong: currentSongReducer,
  playback: playbackReducer,
});

export default rootReducer;
