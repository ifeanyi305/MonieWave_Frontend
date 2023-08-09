import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SIGN_IN = 'auth/sign_in';
const SIGN_UP = 'auth/sign_up';
const SIGN_OUT = 'auth/sign_out';
const RESET_PASSWORD = 'auth/reset_password';
const VERIFY_OTP = 'auth/verify_otp';
const CLEAN_FLASH = 'auth/clean_flash';
const RESET_STATE_AND_KEEP_FLASH = 'auth/reset_state_and_keep_flash';

const SIGN_IN_URL = `https://ratehive.onrender.com/auth/login`;
const SIGN_UP_URL = `https://ratehive.onrender.com/api/v1/users`;
const RESET_PASSWORD_URL = `https://ratehive.onrender.com/api/v1/password/reset`;
const VERIFY_OTP_URL = `https://ratehive.onrender.com/api/v1/otp/verify_otp`;

const initialState = {
  role: '',
};

const setToken = (token) => {
  localStorage.setItem('user', JSON.stringify({ token }));
}

const removeToken = () => {
  localStorage.removeItem('user');
}

export const getToken = () => JSON.parse(localStorage.getItem('user'))?.token;
export const cleanFlash = () => ({ type: CLEAN_FLASH });
export const resetStateAndKeepFlash = () => ({
  type: RESET_STATE_AND_KEEP_FLASH,
});

export const signin = createAsyncThunk(
  SIGN_IN,
  async (user, { rejectWithValue }) => {
    try {
      const data = await axios.post(SIGN_IN_URL, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const tokenCreatedDate = new Date();
      const tokenExpiryDate = new Date(tokenCreatedDate.getTime() + 3 * 24 * 60 * 60 * 1000);
      
      const userDetails = {
        token: data.data.data.meta.token,
        role: data.data.data.attributes.role,
        username: data.data.data.attributes.first_name,
        token_expiry_date: tokenExpiryDate,
      };
      
      localStorage.setItem('user', JSON.stringify(userDetails));
      setToken(userDetails);      
      
      return { progress: data.status };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  RESET_PASSWORD,
  async (payload, { rejectWithValue }) => {
    const response = await fetch(RESET_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: payload }),
    });

    if (!response.ok) {
      return rejectWithValue({
        success: response.ok,
        errors: ['Invalid Credentials'],
      })
    }

    return { success: response.ok, ...(await response.json()) }
  }
)

export const verifyOtp = createAsyncThunk(
  VERIFY_OTP,
  async (payload, { rejectWithValue }) => {
    const response = await fetch(VERIFY_OTP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: payload }),
    });

    if (!response.ok) {
      return rejectWithValue({
        success: response.ok,
        errors: ['Invalid Credentials'],
      })
    }

    return { success: response.ok, ...(await response.json()) }
  }
)

export const signup = createAsyncThunk(
  SIGN_UP,
  async (payload, { rejectWithValue }) => {
    const response = await fetch(SIGN_UP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: payload }),
    });

    if (!response.ok) {
      return rejectWithValue({
        success: response.ok,
        errors: ['Invalid Credentials'],
      })
    }

    const tokenCreatedDate = new Date();
    const tokenExpiryDate = new Date(tokenCreatedDate.getTime() + 3 * 24 * 60 * 60 * 1000);

    const data = await response.json();
    const userDetails = {
      token: data.data.meta.token,
      role: data.data.attributes.role,
      username: data.data.attributes.first_name,
      token_expiry_date: tokenExpiryDate,
    }
    localStorage.setItem('user', JSON.stringify(userDetails));
    setToken(userDetails);
    return { success: response.ok, ...data };
  },
)

export const signout = createAsyncThunk(
  SIGN_OUT,
  async (_, { dispatch }) => {
    removeToken();
    localStorage.removeItem('current');
    dispatch({ type: 'CLEAR_USER_DATA' });
  }
);

export default (state = initialState, action) => {
  switch (action.type) {
    // SIGN IN
    case `${SIGN_IN}/pending`:
      return { progress: false, loading: true, errors: false };
    case `${SIGN_IN}/fulfilled`:
      return {
        progress: action.payload,
        loading: false,
        // message: action.payload.message,
        // user: action.payload.resource,
        errors: false,
      }
    case `${SIGN_IN}/rejected`:
      return { progress: false, loading: false, errors: true, };
    // SIGN OUT
    case `${SIGN_OUT}/pending`:
      return { success: null };
    case `${SIGN_OUT}/fulfilled`:
      return {
        success: true,
        loading: false,
        user: null,
      }
    case `${SIGN_OUT}/rejected`:
      return {
        success: false,
        loading: false,
        errors: action.payload.errors,
      }
    // SIGN IN
    case `${SIGN_UP}/pending`:
      return {
        success: null,
        coming: true,
      }
    case `${SIGN_UP}/fulfilled`:
      return { success: true, coming: false, message: action.payload.message };
    case `${SIGN_UP}/rejected`:
      return { success: false, coming: false, errors: action.payload.errors };
    // CLEAN_FLASH
    case CLEAN_FLASH:
      return { success: null, loading: false };
    // RESET_STATE_AND_KEEP_FLASH
    case RESET_STATE_AND_KEEP_FLASH:
      return { ...state, loading: false, success: null };
    // RESET PASSWORD
    case `${RESET_PASSWORD}/pending`:
      return {
        success: null,
        loading: true,
      }
    case `${RESET_PASSWORD}/fulfilled`:
      return {
        success: true,
        loading: false,
        message: action.payload.message,
      }
    case `${RESET_PASSWORD}/rejected`:
      return {
        success: false,
        loading: false,
        errors: action.payload.errors
      }
    // VERIFY OTP
    case `${VERIFY_OTP}/pending`:
      return {
        success: null,
        loading: true,
      }
    case `${VERIFY_OTP}/fulfilled`:
      return {
        verified: true,
        loading: false,
        message: action.payload.message,
      }
    case `${VERIFY_OTP}/rejected`:
      return {
        success: false,
        loading: false,
        errors: action.payload.errors
      }
    default:
      return state;
  }
}
