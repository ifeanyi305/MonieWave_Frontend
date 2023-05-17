import { createAsyncThunk } from '@reduxjs/toolkit';

const SIGN_IN = 'auth/sign_in';
const SIGN_UP = 'auth/sign_up';
const SIGN_OUT = 'auth/sign_out';
const RESET_PASSWORD = 'auth/reset_password';
const VERIFY_OTP = 'auth/verify_otp';
const CLEAN_FLASH = 'auth/clean_flash';
const RESET_STATE_AND_KEEP_FLASH = 'auth/reset_state_and_keep_flash';

const SIGN_IN_URL = `http://127.0.0.1:3000/auth/login`;
const SIGN_UP_URL = `http://127.0.0.1:3000/api/v1/users`;
const RESET_PASSWORD_URL = `http://127.0.0.1:3000/api/v1/password/reset`;
const VERIFY_OTP_URL = `http://127.0.0.1:3000/api/v1/otp/verify_otp`;

const initialState = [];

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
  async (payload, { rejectWithValue }) => {
    const response = await fetch(SIGN_IN_URL, {
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

    const data = await response.json();
    localStorage.setItem('user', data.data.meta.token);
    setToken(data.data.meta.token);
    return { success: response.ok, ...data };
  },
)

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

    const data = await response.json();
    localStorage.setItem('user', data.data.meta.token);
    setToken(data.data.meta.token);
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
      return { progress: null, loading: true };
    case `${SIGN_IN}/fulfilled`:
      return {
        progress: true,
        loading: false,
        message: action.payload.message,
        user: action.payload.resource,
      }
    case `${SIGN_IN}/rejected`:
      return { progress: false, loading: false, errors: action.payload?.errors };
    // SIGN OUT
    case `${SIGN_OUT}/pending`:
      return { success: null };
    case `${SIGN_OUT}/fulfilled`:
      return {
        success: true,
        loading: false,
        message: action.payload.message,
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
    default:
      return state;
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
  }
}
