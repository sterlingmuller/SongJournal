import { SQLiteDatabase } from 'expo-sqlite';

import * as t from '@src/common/types';
import * as at from '@src/sagas/actionTypes';
import { createAction } from '@reduxjs/toolkit';

// Fetching all songs with takes

export const fetchSongsWithTakesRequest = (db: SQLiteDatabase) => ({
  type: at.FETCH_SONGS_WITH_TAKES_REQUEST,
  payload: db,
});

export const fetchSongsWithTakesSuccess = createAction(
  at.FETCH_SONGS_WITH_TAKES_SUCCESS,
  (songsAndTakes: t.songs) => ({ payload: songsAndTakes }),
);

export const fetchSongsWithTakesFailure = createAction(
  at.FETCH_SONGS_WITH_TAKES_FAILURE,
  (error: Error) => ({ payload: error }),
);

// Creating a new song

export const createSongRequest = (payload: t.createSongPayload) => ({
  type: at.CREATE_SONG_REQUEST,
  payload,
});

export const createSongSuccess = createAction(
  at.CREATE_SONG_SUCCESS,
  (song: t.song) => ({ payload: song }),
);

export const createSongFailure = createAction(
  at.CREATE_SONG_FAILURE,
  (error: Error) => ({ payload: error }),
);

// Creating a new take

export const createTakeRequest = (payload: t.takePayload) => ({
  type: at.CREATE_TAKE_REQUEST,
  payload,
});

export const createTakeSuccess = createAction(
  at.CREATE_TAKE_SUCCESS,
  (take: t.take) => ({ payload: take }),
);

export const createTakeFailure = createAction(
  at.CREATE_TAKE_FAILURE,
  (error: Error) => ({ payload: error }),
);

// Updating selectedTakeId

export const updateSelectedTakeIdRequest = (
  payload: t.updateSelectedTakeIdPayloadDb,
) => ({
  type: at.UPDATE_SELECTED_TAKE_ID_REQUEST,
  payload,
});

export const updateSelectedTakeIdSuccess = createAction(
  at.UPDATE_SELECTED_TAKE_ID_SUCCESS,
  (idInfo: t.setSelectedTakeIdPayload) => ({ payload: idInfo }),
);

export const updateSelectedTakeIdFailure = createAction(
  at.UPDATE_SELECTED_TAKE_ID_FAILURE,
  (error: Error) => ({ payload: error }),
);

// Fetching page by songId

export const fetchPageRequest = (payload: t.fetchPagePayload) => ({
  type: at.FETCH_PAGE_REQUEST,
  payload,
});

// Updating page

export const updatePageInfoRequest = (payload: t.updatePageInfoPayload) => ({
  type: at.UPDATE_PAGE_INFO_REQUEST,
  payload,
});

export const updatePageInfoSuccess = createAction(
  at.UPDATE_PAGE_INFO_SUCCESS,
  (payload: t.updatePageInfoPayload) => ({ payload }),
);

export const updatePageInfoFailure = createAction(
  at.UPDATE_PAGE_INFO_FAILURE,
  (error: Error) => ({ payload: error }),
);

// Updating lyrics

export const updateLyricsRequest = (payload: t.updateLyricsPayload) => ({
  type: at.UPDATE_LYRICS_REQUEST,
  payload,
});

export const updateLyricsSuccess = createAction(
  at.UPDATE_LYRICS_SUCCESS,
  (payload: t.updateLyricsSuccess) => ({ payload }),
);

export const updateLyricsFailure = createAction(
  at.UPDATE_LYRICS_FAILURE,
  (error: Error) => ({ payload: error }),
);
