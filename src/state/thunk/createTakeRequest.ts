import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus } from '@src/components/common/enums';
import { TakePayload } from '@src/components/common/types';
import { createTake } from '@src/data/repositories/TakeRepository';

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
