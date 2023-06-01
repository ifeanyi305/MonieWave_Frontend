import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth'

const RECIPIENT = 'recipient';
const RECIPIENT_URL = `http://127.0.0.1:3000/api/v1/beneficiaries`

const initialState = [];

export const saveRecipients = createAsyncThunk(
  RECIPIENT,
  async (payload, { rejectWithValue }) => {
    const response = await fetch(RECIPIENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
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
    case `${RECIPIENT}/pending`:
      return { successful: false, coming: true }
    case `${RECIPIENT}/fulfilled`:
      return {
        successful: true,
        coming: false,
        message: action.payload.message,
      }
    case `${RECIPIENT}/rejected`:
      return {
        successful: false,
        coming: false,
        message: action.payload.errors
      }
    default:
      return state;
  }
}