import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';
import axios from 'axios';

const UPDATESTATUS = 'update_status'
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  updated: [],
  updating: false,
  canceled: false,
};

export const updateUserStatus = createAsyncThunk(
  UPDATESTATUS,
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put('http://127.0.0.1:3000/api/v1/users/update_user_status', user, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${UPDATESTATUS}/pending`:
      return {
        updating: true,
        updated: false,
        canceled: false,
      }
    case `${UPDATESTATUS}/fulfilled`:
      return {
        updated: action.payload,
        updating: false,
        canceled: false
      }
    case `${UPDATESTATUS}/rejected`:
      return {
        updated: false,
        updating: false,
        canceled: true
      }
    default:
      return {...state, updated: false, updating: false, canceled: false};
  }
}
