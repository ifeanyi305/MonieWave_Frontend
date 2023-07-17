import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/auth';

const AllTRANSFERS = 'allTransfers';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  victory: [],
  loading: false,
  error: false,
};

export const fetchTransfers = createAsyncThunk(
  AllTRANSFERS,
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      const res = await axios.get('https://ratehive.onrender.com/api/v1/transfers', config);
      return { victory: res.data.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${AllTRANSFERS}/pending`:
      return {
        ...state,
        victory: false,
        loading: true,
        error: false
      }
    case `${AllTRANSFERS}/fulfilled`:
      return {
        ...state,
        victory: action.payload,
        loading: false,
        message: action.payload.message,
        error: false
      }
    case `${AllTRANSFERS}/rejected`:
      return {
        ...state,
        victory: false,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}