import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/auth';

const GETAllTRANSFERS = 'getAllTransfers';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  success: [],
  loading: false,
  error: false,
};

export const fetchAllTransfers = createAsyncThunk(
  GETAllTRANSFERS,
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      const res = await axios.get('http://127.0.0.1:3000/api/v1/transfers/show_all_transfers', config);
      return { success: res.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GETAllTRANSFERS}/pending`:
      return {
        ...state,
        success: false,
        loading: true,
        error: false
      }
    case `${GETAllTRANSFERS}/fulfilled`:
      return {
        ...state,
        success: action.payload,
        loading: false,
        message: action.payload.message,
        error: false
      }
    case `${GETAllTRANSFERS}/rejected`:
      return {
        ...state,
        success: false,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}