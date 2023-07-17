import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';
import axios from 'axios';

const UPDATEROLE = 'update_role'
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  modified: [],
  modifying: false,
  terminated: false,
};

export const updateUserRole = createAsyncThunk(
  UPDATEROLE,
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put('https://ratehive.onrender.com/api/v1/users/update_user_role', user, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${UPDATEROLE}/pending`:
      return {
        modifying: true,
        modified: false,
        terminated: false,
      }
    case `${UPDATEROLE}/fulfilled`:
      return {
        modified: action.payload,
        modifying: false,
        terminated: false
      }
    case `${UPDATEROLE}/rejected`:
      return {
        modified: false,
        modifying: false,
        terminated: true
      }
    default:
      return {...state, modified: false, modifying: false, terminated: false};
  }
}
