import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';
import axios from 'axios';

const CREATE_EXCHANGE_RATE = 'create_exchange_rate';
const userDetails = getToken();
const RATE_URL = 'http://127.0.0.1:3000/api/v1/rate/create';
const token = userDetails?.token;

const initialState = {
  success: [],
  loading: false,
  error: false
}

export const createExchangeRate = createAsyncThunk(
  CREATE_EXCHANGE_RATE,
  async (data, { rejectWithValue }) => {
    try {
      const rate = await axios.post(RATE_URL, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      return {success: rate.data.message}
    }
    catch(error) {
      return rejectWithValue(error);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_EXCHANGE_RATE}/pending`:
      return {
        loading: true,
        success: false,
        error: false,
      }
    case `${CREATE_EXCHANGE_RATE}/fulfilled`:
      return {
        success: action.payload,
        loading: false,
        error: false,
      }
    case `${CREATE_EXCHANGE_RATE}/rejected`:
      return {
        success: false,
        loading: false,
        error: true,
      }
    default:
      return {...state, success: false, loading: false, error: false};
  }
}
