import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';
import axios from 'axios';

const DELETEUSER = 'delete_user';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  success: [],
  pending: false,
  error: false,
}

export const deleteUser = createAsyncThunk(
  DELETEUSER,
  async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:3000/api/v1/users/${id}`, {
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
    case `${DELETEUSER}/pending`:
      return {
        pending: true,
        success: false,
        error: false,
      }
    case `${DELETEUSER}/fulfilled`:
      return {
        success: action.payload,
        pending: false,
        error: false,
      }
    case `${DELETEUSER}/rejected`:
      return {
        success: false,
        pending: false,
        error: true,
      }
    default:
      return {...state, success: false, error: false, pending: false};
  }
}
