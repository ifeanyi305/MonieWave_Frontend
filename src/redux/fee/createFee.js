import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/auth';

const NEW_FEE = 'new_fee';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  newFee: [],
  loading: false,
  error: false,
}

export const createFee = createAsyncThunk(
  NEW_FEE,
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios.post('http://127.0.0.1:3000/api/v1/fee_ranges', data, config);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${NEW_FEE}/pending`:
      return {
        ...state,
        loading: true,
        error: false
      }
    case `${NEW_FEE}/fulfilled`:
      return {
        ...state,
        newFee: action.payload,
        loading: false,
        error: false
      }
    case `${NEW_FEE}/rejected`:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return { ...state };
  }
}
