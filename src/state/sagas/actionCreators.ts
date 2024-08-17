import { SQLiteDatabase } from 'expo-sqlite';

import * as t from '@src/components/common/types';
import * as at from '@src/state/sagas/actionTypes';

// Startup

export const fetchSongsWithTakesRequest = (db: SQLiteDatabase) => ({
  type: at.FETCH_SONGS_WITH_TAKES_REQUEST,
  payload: db,
});

// Songs

export const createSongRequest = (payload: t.CreateSongPayload) => ({
  type: at.CREATE_SONG_REQUEST,
  payload,
});

export const deleteSongRequest = (payload: t.DeleteSongPayload) => ({
  type: at.DELETE_SONG_REQUEST,
  payload,
});

// Pages

export const fetchPageRequest = (payload: t.FetchPagePayload) => ({
  type: at.FETCH_PAGE_REQUEST,
  payload,
});

export const updateLyricsRequest = (payload: t.UpdateLyricsPayload) => ({
  type: at.UPDATE_LYRICS_REQUEST,
  payload,
});

export const updatePageInfoRequest = (payload: t.UpdatePageInfoPayload) => ({
  type: at.UPDATE_PAGE_INFO_REQUEST,
  payload,
});

// Takes

export const createTakeRequest = (payload: t.TakePayload) => ({
  type: at.CREATE_TAKE_REQUEST,
  payload,
});

export const updateTakeNotesRequest = (
  payload: t.UpdateTakeNotesSagaPayload,
) => ({
  type: at.UPDATE_TAKE_NOTES_REQUEST,
  payload,
});

export const deleteTakeRequest = (payload: t.DeleteTakeSagaPayload) => ({
  type: at.DELETE_TAKE_REQUEST,
  payload,
});

export const updateSelectedTakeIdRequest = (
  payload: t.UpdateSelectedTakeIdPayloadDb,
) => ({
  type: at.UPDATE_SELECTED_TAKE_ID_REQUEST,
  payload,
});
