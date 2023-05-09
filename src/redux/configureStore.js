import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
// import flash from './flash/flash';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // flash: flashReducer,
  }
})

export default store;
