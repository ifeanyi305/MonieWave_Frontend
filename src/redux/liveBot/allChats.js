import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/auth';

const ALL_CHATS = 'chats/fetchChats';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  progress: [],
  pending: false,
  failed: false,
};

export const fetchChats = createAsyncThunk(
  ALL_CHATS,
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios.get('https://ratehive.onrender.com/api/v1/chats', config);
      return { progress: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${ALL_CHATS}/pending`:
      return {
        ...state,
        progress: false,
        pending: true,
        failed: false
      }
    case `${ALL_CHATS}/fulfilled`:
      return {
        ...state,
        progress: action.payload,
        pending: false,
        failed: false
      }
    case `${ALL_CHATS}/rejected`:
      return {
        ...state,
        progress: false,
        pending: false,
        failed: true
      }
    default:
      return {...state};
  }
}
