import { combineReducers } from 'redux';

import songsReducer from '@src/slice/songsSlice';
import currentSongReducer from '@src/slice/currentSongSlice';
import currentTakeReducer from '@src/slice/currentTakeSlice';
import takeReducer from '@src/slice/takeSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  take: takeReducer,
  currentSong: currentSongReducer,
  currentTake: currentTakeReducer,
});

export default rootReducer;
