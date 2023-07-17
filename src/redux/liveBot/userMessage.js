import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/auth';

const CHAT_MESSAGES = 'chat/messages'
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  message: [],
  pending: false,
  failed: false,
};

export const fetchMessages = createAsyncThunk(
  CHAT_MESSAGES,
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      const response = await axios.get('https://ratehive.onrender.com/api/v1/chats/1', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CHAT_MESSAGES}/pending`:
      return {
        ...state,
        pending: true,
        failed: false
      }
    case `${CHAT_MESSAGES}/fulfilled`:
      return {
        ...state,
        message: action.payload,
        pending: false,
        failed: false
      }
    case `${CHAT_MESSAGES}/rejected`:
      return {
        ...state,
        pending: false,
        failed: true
      }
    default:
      return { ...state };
  }
}
