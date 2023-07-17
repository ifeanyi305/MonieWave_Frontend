import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/auth';

const SHOWUSER = 'getAllUsers';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  progress: [],
  loading: false,
  failed: false,
};

export const showUserDetails = createAsyncThunk(
  SHOWUSER,
  async (id) => {
    try {
      const response = await axios.get(`https://ratehive.onrender.com/api/v1/users/${id}`, {
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
    case `${SHOWUSER}/pending`:
      return {
        loading: true,
        progress: false,
        failed: false,
      }
    case `${SHOWUSER}/fulfilled`:
      return {
        progress: action.payload,
        loading: false,
        failed: false
      }
    case `${SHOWUSER}/rejected`:
      return {
        progress: false,
        loading: false,
        failed: true
      }
    default:
      return {...state, progress: false};
  }
}