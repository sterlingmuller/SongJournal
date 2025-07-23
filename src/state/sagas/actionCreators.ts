import { SQLiteDatabase } from 'expo-sqlite';

import * as t from '@src/components/common/types';
import * as at from '@src/state/sagas/actionTypes';

// Startup

export const fetchStartupDataRequest = (db: SQLiteDatabase) => ({
  type: at.FETCH_STARTUP_DATA_REQUEST,
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

export const updateSongArtistRequest = (
  payload: t.UpdateSongArtistSagaPayload
) => ({
  type: at.UPDATE_SONG_ARTIST_REQUEST,
  payload,
});

export const updateSongCompletionRequest = (
  payload: t.UpdateSongCompletionSagaPayload
) => ({
  type: at.UPDATE_SONG_COMPLETION_REQUEST,
  payload,
});

// Pages

export const fetchPageRequest = (payload: t.FetchPagePayload) => ({
  type: at.FETCH_PAGE_REQUEST,
  payload,
});

// Takes

export const updateTakeNotesRequest = (
  payload: t.UpdateTakeNotesSagaPayload
) => ({
  type: at.UPDATE_TAKE_NOTES_REQUEST,
  payload,
});

export const deleteTakeRequest = (payload: t.DeleteTakeSagaPayload) => ({
  type: at.DELETE_TAKE_REQUEST,
  payload,
});

export const updateSelectedTakeIdRequest = (
  payload: t.UpdateSelectedTakeIdPayloadDb
) => ({
  type: at.UPDATE_SELECTED_TAKE_ID_REQUEST,
  payload,
});

// Settings

export const updateSettingsRequest = (payload: t.UpdateSettingsDbPayload) => ({
  type: at.UPDATE_SETTINGS_REQUEST,
  payload,
});

export const updateCloudConnectionRequest = (
  payload: t.UpdateSettingsDbPayload
) => ({
  type: at.UPDATE_CLOUD_CONNECTION_REQUEST,
  payload,
});

export const updateSyncSettingsRequest = (
  payload: t.UpdateSettingsDbPayload
) => ({
  type: at.UPDATE_SYNC_SETTINGS_REQUEST,
  payload,
});

// Artists

export const addArtistRequest = (payload: t.AddArtistDbPayload) => ({
  type: at.ADD_ARTIST_REQUEST,
  payload,
});

export const deleteArtistRequest = (payload: t.DeleteArtistDbPayload) => ({
  type: at.DELETE_ARTIST_REQUEST,
  payload,
});

// Purchases

export const updatePurchasesRequest = (
  payload: t.UpdatePurchasesDbPayload
) => ({
  type: at.UPDATE_PURCHASES_REQUEST,
  payload,
});
