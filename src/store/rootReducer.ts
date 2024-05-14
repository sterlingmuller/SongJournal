import { combineReducers } from 'redux';
import currentSongReducer from '@src/slice/currentSongSlice';

const rootReducer = combineReducers({ currentSong: currentSongReducer });

export default rootReducer;
