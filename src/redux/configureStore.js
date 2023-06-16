import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import transferReducer from './moneyTransfer/transfer';
import getTransferReducer from './moneyTransfer/fetchTransfer';
import getAllTransferReducer from './moneyTransfer/allTransfers';
import recipientReducer from './recipients/recipients';
import getUsersReducer from './users/users';
import showUserDetailsReducer from './users/userDetails';
import updateTransferReducer from './moneyTransfer/updateTransfer';
import showTransferReducer from './moneyTransfer/showTransfer';
import superUserReducer from './superUser/superUser';
import deleteUserReducer from './superUser/deleteUser';

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
    userDetails: showUserDetailsReducer,
    superUser: superUserReducer,
    terminateUser: deleteUserReducer,
  }
})

export default store;
