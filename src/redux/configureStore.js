import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import transferReducer from './moneyTransfer/transfer';
// import flash from './flash/flash';

const store = configureStore({
  reducer: {
    auth: authReducer,
    transfer: transferReducer,
    // flash: flashReducer,
  }
})

export default store;
