import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus } from '@src/components/common/enums';
import { UpdateSongTitleSagaPayload } from '@src/components/common/types';
import { updateSongTitle } from '@src/data/repositories/SongsRepository';

export const updateSongTitleRequest = createAsyncThunk(
  'songs/updateSongTitle',
  async (
    payload: UpdateSongTitleSagaPayload,
    { rejectWithValue }: { rejectWithValue: (value: RequestStatus) => void },
  ) => {
    try {
      await updateSongTitle(payload);
    } catch (error) {
      return rejectWithValue(RequestStatus.FAILURE);
    }
  },
);
