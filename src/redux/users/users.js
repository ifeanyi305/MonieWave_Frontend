import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/auth';

const GETALLUSERS = 'getAllUsers';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  successful: [],
  pending: false,
  failed: false,
};

export const fetchAllUsers = createAsyncThunk(
  GETALLUSERS,
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      const res = await axios.get('http://127.0.0.1:3000/api/v1/users', config);
      return { successful: res.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GETALLUSERS}/pending`:
      return {
        ...state,
        successful: false,
        pending: true,
        failed: false
      }
    case `${GETALLUSERS}/fulfilled`:
      return {
        ...state,
        successful: action.payload,
        pending: false,
        message: action.payload.message,
        failed: false
      }
    case `${GETALLUSERS}/rejected`:
      return {
        ...state,
        successful: false,
        pending: false,
        failed: true
      }
    default:
      return state;
  }
}