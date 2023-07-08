import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/auth';

const CHAT_BOT = 'chat/bot';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  chatData: [],
  loading: false,
  error: false,
};

export const createChatMessage = createAsyncThunk(
  CHAT_BOT,
  async (messageData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios.post('http://127.0.0.1:3000/api/v1/chats', messageData, config);
      return response.data.messages;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CHAT_BOT}/pending`:
      return {
        ...state,
        loading: true,
        error: false
      }
    case `${CHAT_BOT}/fulfilled`:
      return {
        ...state,
        chatData: action.payload,
        loading: false,
        error: false
      }
    case `${CHAT_BOT}/rejected`:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return { ...state };
  }
}
