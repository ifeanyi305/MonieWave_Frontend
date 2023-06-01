import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';
import axios from 'axios';

const RECIPIENT = 'recipient';
const ALLRECIPIENT = 'allRecipient';
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

export const fetchRecipients = createAsyncThunk(
  ALLRECIPIENT,
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      };

      const response = await axios.get('http://127.0.0.1:3000/api/v1/beneficiaries', config);
      return { success: response.data.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
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
    case `${ALLRECIPIENT}/pending`:
      return {
        success: false, loading: true
      }
    case `${ALLRECIPIENT}/fulfilled`:
      return {
        success: action.payload, loading: false, message: action.payload.message
      }
    case `${ALLRECIPIENT}/rejected`:
      return {
        success: false, loading: false, error: action.payload.error
      }
    default:
      return state;
  }
}