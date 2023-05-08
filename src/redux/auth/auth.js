import { createAsyncThunk } from '@reduxjs/toolkit';

const SIGN_IN = 'auth/sign_in';
const SIGN_UP = 'auth/sign_up';
const SIGN_OUT = 'auth/sign_out';
const CLEAN_FLASH = 'auth/clean_flash';
const RESET_STATE_AND_KEEP_FLASH = 'auth/reset_state_and_keep_flash';

const SIGN_IN_URL = `${process.env.REACT_APP_API_ROOT_URL}/auth/login`;
const SIGN_UP_URL = `${process.env.REACT_APP_API_ROOT}/api/v1/users`;
const SIGN_OUT_URL = `${process.env.REACT_APP_API_ROOT_URL}/users/sign_out`;

const initialState = [];

const setToken = (token) => {
  sessionStorage.setItem('user', JSON.stringify({ token }));
}

const removeToken = (token) => {
  sessionStorage.removeItem('user');
}

const getToken = () => JSON.parse(sessionStorage.getItem('user'))?.token;