import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth'

const TRANSFER = 'transfers';
const TRANSFER_URL = `http://127.0.0.1:3000/api/v1/transfers`;

const initialState = [];


export const transfer = createAsyncThunk(
  TRANSFER,
  async (transferData, { rejectWithValue }) => {
    const {transferDetails, token} = transferData
    console.log(transferDetails, token);
    const response = await fetch(TRANSFER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ data: transferDetails }),
    });
    console.log(response)
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
