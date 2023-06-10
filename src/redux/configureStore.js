import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import transferReducer from './moneyTransfer/transfer';
import getTransferReducer from './moneyTransfer/fetchTransfer';
import getAllTransferReducer from './moneyTransfer/allTransfers';
import recipientReducer from './recipients/recipients';
import getUsersReducer from './users/users';
import updateTransferReducer from './moneyTransfer/updateTransfer';
import showTransferReducer from './moneyTransfer/showTransfer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    transfer: transferReducer,
    allTransfers: getTransferReducer,
    beneficiary: recipientReducer,
    getAllTransfers: getAllTransferReducer,
    users: getUsersReducer,
    updateTransfer: updateTransferReducer,
    showTransfer: showTransferReducer,
  }
})

export default store;
