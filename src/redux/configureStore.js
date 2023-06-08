import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import transferReducer from './moneyTransfer/transfer';
import getTransferReducer from './moneyTransfer/fetchTransfer';
import recipientReducer from './recipients/recipients';

const store = configureStore({
  reducer: {
    auth: authReducer,
    transfer: transferReducer,
    allTransfers: getTransferReducer,
    beneficiary: recipientReducer,
  }
})

export default store;
