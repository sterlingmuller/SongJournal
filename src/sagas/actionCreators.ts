import { SQLiteDatabase } from 'expo-sqlite';

import {
  createSongPayload,
  fetchPagePayload,
  setSelectedTakeIdPayload,
  song,
  take,
  takePayload,
  updateSelectedTakeIdPayloadDb,
} from '@src/common/types';
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

// Creating a new take

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

// Updating selectedTakeId

export const updateSelectedTakeIdRequest = (
  payload: updateSelectedTakeIdPayloadDb,
) => ({
  type: at.UPDATE_SELECTED_TAKE_ID_REQUEST,
  payload,
});

export const updateSelectedTakeIdSuccess = createAction(
  at.UPDATE_SELECTED_TAKE_ID_SUCCESS,
  (idInfo: setSelectedTakeIdPayload) => ({ payload: idInfo }),
);

export const updateSelectedTakeIdFailure = createAction(
  at.UPDATE_SELECTED_TAKE_ID_FAILURE,
  (error: Error) => ({ payload: error }),
);

// Fetching page by songId

export const fetchPageRequest = (payload: fetchPagePayload) => ({
  type: at.FETCH_PAGE_REQUEST,
  payload,
});
