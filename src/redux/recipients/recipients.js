import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';
import axios from 'axios';

const RECIPIENT = 'recipient';
const ALLRECIPIENT = 'allRecipient';
const DELETERECIPIENT = 'deleteRecipient';
const RECIPIENT_URL = `https://ratehive.onrender.com/api/v1/beneficiaries`;
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  success: [],
  loading: false,
  error: false
};

export const saveRecipients = createAsyncThunk(
  RECIPIENT,
  async (payload, { rejectWithValue }) => {
    const response = await fetch(RECIPIENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        }
      };

      const response = await axios.get('https://ratehive.onrender.com/api/v1/beneficiaries', config);
      return { success: response.data.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRecipients = createAsyncThunk(
  DELETERECIPIENT,
  async (id) => {
    try {
      const response = await axios.delete(`https://ratehive.onrender.com/api/v1/beneficiaries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${RECIPIENT}/pending`:
      return {
        ...state,
        success: false,
        loading: true,
        error: false,
      }
    case `${RECIPIENT}/fulfilled`:
      return {
        ...state,
        success: true,
        loading: false,
        message: action.payload.message,
        error: false,
      }
    case `${RECIPIENT}/rejected`:
      return {
        ...state,
        success: false,
        loading: false,
        message: action.payload.errors,
        error: true,
      }
    case `${ALLRECIPIENT}/pending`:
      return {
        ...state,
        success: false,
        loading: true,
        error: false
      }
    case `${ALLRECIPIENT}/fulfilled`:
      return {
        ...state,
        success: action.payload,
        loading: false,
        message: action.payload.message,
        error: false
      }
    case `${ALLRECIPIENT}/rejected`:
      return {
        ...state,
        success: false,
        loading: false,
        error: true
      }
    case `${DELETERECIPIENT}/pending`:
      return {
        loading: true,
        success: false,
        error: false,
      }
    case `${DELETERECIPIENT}/fulfilled`:
      return {
        success: action.payload,
        loading: false,
        error: false
      }
    case `${DELETERECIPIENT}/rejected`:
      return {
        success: false,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}