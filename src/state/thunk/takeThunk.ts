import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus } from '@src/components/common/enums';
import {
  TakePayload,
  UpdateSelectedTakeIdPayloadDb,
  UpdateTakeTitleSagaPayload,
} from '@src/components/common/types';
import { updateSelectedTakeId } from '@src/data/repositories/SongsRepository';
import {
  createTake,
  updateTakeTitle,
} from '@src/data/repositories/TakeRepository';

export const createTakeRequest = createAsyncThunk(
  'takes/createTake',
  async (
    payload: TakePayload,
    { rejectWithValue }: { rejectWithValue: (value: RequestStatus) => void },
  ) => {
    try {
      const take = await createTake(payload);
      return take;
    } catch (error) {
      return rejectWithValue(RequestStatus.FAILURE);
    }
  },
);

export const updateSelectedTakeRequest = createAsyncThunk(
  'takes/updateSelectedTake',
  async (
    payload: UpdateSelectedTakeIdPayloadDb,
    { rejectWithValue }: { rejectWithValue: (value: RequestStatus) => void },
  ) => {
    try {
      await updateSelectedTakeId(payload);
    } catch (error) {
      return rejectWithValue(RequestStatus.FAILURE);
    }
  },
);

export const updateTakeTitleRequest = createAsyncThunk(
  'takes/updateTakeTitle',
  async (
    payload: UpdateTakeTitleSagaPayload,
    { rejectWithValue }: { rejectWithValue: (value: RequestStatus) => void },
  ) => {
    try {
      await updateTakeTitle(payload);
    } catch (error) {
      return rejectWithValue(RequestStatus.FAILURE);
    }
  },
);
