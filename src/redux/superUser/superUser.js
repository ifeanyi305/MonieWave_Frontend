import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const SUPER_USER = 'create_superuser';
const SUPER_USER_URL = `http://127.0.0.1:3000/api/v1/users/create_super_user`;
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  success: [],
  coming: false,
  error: false
}

export const createSuperUser = createAsyncThunk(
  SUPER_USER,
  async (payload, {rejectWithValue}) => {
    const response = await fetch(SUPER_USER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user: payload }),
    });


    if (!response.ok) {
      return rejectWithValue({
        success: response.ok,
        error: ['Invalid Credentials'],
      })
    }

    const data = await response.json();
    return { success: response.ok, ...data };
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SUPER_USER}/pending`:
      return {
        coming: true,
        success: false,
        error: false,
      }
    case `${SUPER_USER}/fulfilled`:
      return {
        success: action.payload,
        coming: false,
        error: false,
      }
    case `${SUPER_USER}/rejected`:
      return {
        success: false,
        coming: false,
        error: true,
      }
    default:
      return {...state, success: false};
  }
}
