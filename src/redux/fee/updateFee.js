import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';
import axios from 'axios';

const UPDATE_FEE = 'new_fee';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  updateFee: [],
  pending: false,
  failed: false,
}

export const updateFee = createAsyncThunk(
  UPDATE_FEE,
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios.put('http://127.0.0.1:3000/api/v1/fee_ranges', data, config);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${UPDATE_FEE}/pending`:
      return {
        ...state,
        pending: true,
        failed: false
      }
    case `${UPDATE_FEE}/fulfilled`:
      return {
        ...state,
        updateFee: action.payload,
        pending: false,
        failed: false
      }
    case `${UPDATE_FEE}/rejected`:
      return {
        ...state,
        pending: false,
        failed: true
      }
    default:
      return { ...state };
  }
}
