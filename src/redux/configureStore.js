import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import transferReducer from './moneyTransfer/transfer';
import recipientReducer from './recipients/recipients';
// import flash from './flash/flash';

const store = configureStore({
  reducer: {
    auth: authReducer,
    transfer: transferReducer,
    beneficiary: recipientReducer,
    // flash: flashReducer,
  }
})

export default store;
