import { createAsyncThunk } from '@reduxjs/toolkit';

import { RequestStatus } from '@src/components/common/enums';
import { UpdateArtistDbPayload } from '@src/components/common/types';
import { updateArtist } from '@src/data/repositories/ArtistsRepository';

export const updateArtistRequest = createAsyncThunk(
  'artists/updateArtists',
  async (
    payload: UpdateArtistDbPayload,
    { rejectWithValue }: { rejectWithValue: (value: RequestStatus) => void },
  ) => {
    try {
      await updateArtist(payload);
    } catch {
      return rejectWithValue(RequestStatus.FAILURE);
    }
  },
);
