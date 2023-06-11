import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/auth';

const SHOWTRANSFER = 'getAllTransfers';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  progress: [],
  pending: false,
  failed: false,
};

export const showUserTransfer = createAsyncThunk(
  SHOWTRANSFER,
  async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/api/v1/transfers/${id}`, {
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
    case `${SHOWTRANSFER}/pending`:
      return {
        pending: true,
        progress: false,
        failed: false,
      }
    case `${SHOWTRANSFER}/fulfilled`:
      return {
        progress: action.payload,
        pending: false,
        failed: false
      }
    case `${SHOWTRANSFER}/rejected`:
      return {
        progress: false,
        pending: false,
        failed: true
      }
    default:
      return {...state};
  }
}