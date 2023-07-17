import { createAsyncThunk } from '@reduxjs/toolkit';

const TRANSFER = 'transfers';
const TRANSFER_URL = `https://ratehive.onrender.com/api/v1/transfers`;

const initialState = [];


export const transfer = createAsyncThunk(
  TRANSFER,
  async (transferData, { rejectWithValue }) => {
    const { transferDetails, token } = transferData;
    const response = await fetch(TRANSFER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ data: transferDetails }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      return rejectWithValue({
        success: response.ok,
        errors: ['Invalid Credentials'],
      })
    }

    return { victory: response.ok, ...responseData }
  },
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${TRANSFER}/pending`:
      return { victory: false, loading: true, errors: false }
    case `${TRANSFER}/fulfilled`:
      return {
        victory: action.payload,
        loading: false,
        // message: action.payload.message,
        errors: false,
      }
    case `${TRANSFER}/rejected`:
      return { victory: false, loading: false, errors: action.payload.errors }
    default:
      return {...state, victory: false};
  }
}
