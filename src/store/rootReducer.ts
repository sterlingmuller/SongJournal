import { combineReducers } from 'redux';

import songsReducer from '@src/slice/songsSlice';
import currentSongReducer from '@src/slice/currentSongSlice';
import takeReducer from '@src/slice/takeSlice';
import currentSongIdReducer from '@src/slice/currentSongIdSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  take: takeReducer,
  currentSongId: currentSongIdReducer,
  // currentSong: currentSongReducer,
});

export default rootReducer;
