import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus } from '@src/components/common/enums';
import {
  UpdateLyricsPayload,
  UpdatePageInfoPayload,
} from '@src/components/common/types';
import {
  updateLyrics,
  updatePageInfo,
} from '@src/data/repositories/PageRepository';

export const updateLyricsRequest = createAsyncThunk(
  'pages/updateLyrics',
  async (
    payload: UpdateLyricsPayload,
    { rejectWithValue }: { rejectWithValue: (value: RequestStatus) => void }
  ) => {
    try {
      await updateLyrics(payload);
    } catch {
      return rejectWithValue(RequestStatus.FAILURE);
    }
  }
);

export const updateInfoRequest = createAsyncThunk(
  'pages/updateInfo',
  async (
    payload: UpdatePageInfoPayload,
    { rejectWithValue }: { rejectWithValue: (value: RequestStatus) => void }
  ) => {
    try {
      await updatePageInfo(payload);
    } catch {
      return rejectWithValue(RequestStatus.FAILURE);
    }
  }
);
