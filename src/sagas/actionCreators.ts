import { SQLiteDatabase } from 'expo-sqlite';

import { createSongPayload, song, take, takePayload } from '@src/common/types';
import * as at from '@src/sagas/actionTypes';
import { createAction } from '@reduxjs/toolkit';

// Fetching all songs with takes

export const fetchSongsWithTakesRequest = (db: SQLiteDatabase) => ({
  type: at.FETCH_SONGS_WITH_TAKES_REQUEST,
  payload: db,
});

export const fetchSongsWithTakesSuccess = createAction(
  at.FETCH_SONGS_WITH_TAKES_SUCCESS,
  (songsAndTakes: song[]) => ({ payload: songsAndTakes }),
);

export const fetchSongsWithTakesFailure = createAction(
  at.FETCH_SONGS_WITH_TAKES_FAILURE,
  (error: Error) => ({ payload: error }),
);

// Creating a new song

export const createSongRequest = (payload: createSongPayload) => ({
  type: at.CREATE_SONG_REQUEST,
  payload,
});

export const createSongSuccess = createAction(
  at.CREATE_SONG_SUCCESS,
  (song: song) => ({ payload: song }),
);

export const createSongFailure = createAction(
  at.CREATE_SONG_FAILURE,
  (error: Error) => ({ payload: error }),
);

// Createing a new take

export const createTakeRequest = (payload: takePayload) => ({
  type: at.CREATE_TAKE_REQUEST,
  payload,
});

export const createTakeSuccess = createAction(
  at.CREATE_TAKE_SUCCESS,
  (take: take) => ({ payload: take }),
);

export const createTakeFailure = createAction(
  at.CREATE_TAKE_FAILURE,
  (error: Error) => ({ payload: error }),
);
