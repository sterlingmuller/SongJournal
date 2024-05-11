import { combineReducers } from 'redux';
import songReducer from '@src/slice/songSlice';

const rootReducer = combineReducers({ song: songReducer });

export default rootReducer;
