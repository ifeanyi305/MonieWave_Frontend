import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/auth';


const MESSAGES = 'messages';
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  message: [],
  fetching: false,
  fault: false,
};

export const showMessages = createAsyncThunk(
  MESSAGES,
  async (id) => {
    try {
      const response = await axios.get(`https://ratehive.onrender.com/api/v1/chats/${id}`, {
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
    case `${MESSAGES}/pending`:
      return {
        ...state,
        fetching: true,
        fault: false,
      }
    case `${MESSAGES}/fulfilled`:
      return {
        message: action.payload,
        fetching: false,
        fault: false
      }
    case `${MESSAGES}/rejected`:
      return {
        ...state,
        fetching: false,
        fault: true,
      }
    default:
      return {...state};
  }
}