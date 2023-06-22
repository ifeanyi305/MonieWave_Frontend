import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';
import axios from 'axios';

const UPDATETRANSFER = 'update_transfer'
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  updated: [],
  loading: false,
  error: false
};

export const updateTransferStatus = createAsyncThunk(
  UPDATETRANSFER,
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put('http://127.0.0.1:3000/api/v1/transfers/update_transfer_status', data, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${UPDATETRANSFER}/pending`:
      return {
        loading: true,
        updated: false,
        error: false,
      }
    case `${UPDATETRANSFER}/fulfilled`:
      return {
        updated: action.payload,
        loading: false,
        error: false
      }
    case `${UPDATETRANSFER}/rejected`:
      return {
        updated: false,
        loading: false,
        error: true
      }
    default:
      return {...state, updated: false};
  }
}