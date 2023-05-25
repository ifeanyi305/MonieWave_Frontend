import { createAsyncThunk } from '@reduxjs/toolkit';

const TRANSFER = 'transfers';
const TRANSFER_URL = `http://127.0.0.1:3000/api/v1/transfers`;

const initialState = [];

export const transfer = createAsyncThunk(
  TRANSFER,
  async (payload, { rejectWithValue }) => {
    const response = await fetch(TRANSFER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: payload }),
    });
    if (!response.ok) {
      return rejectWithValue({
        success: response.ok,
        errors: ['Invalid Credentials'],
      })
    }

    return { success: response.ok, ...(await response.json()) }
  },
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${TRANSFER}/pending`:
      return { victory: false, loading: true }
    case `${TRANSFER}/fulfilled`:
      return {
        victory: true,
        loading: false,
        message: action.payload.message,
      }
    case `${TRANSFER}/rejected`:
      return { victory: false, loading: false, errors: action.payload.errors }
    default:
      return state;
  }
}
