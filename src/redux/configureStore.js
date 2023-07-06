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
import UpdateUserStatusReducer from './superUser/updateUserStatus';
import UpdateUserRoleReducer from './superUser/updateUserRole';
import ExchangeRatesReducer from './exchangeRate/exchangeRate';
import ChatReducer from './liveBot/chat';
import AllchatReducer from './liveBot/allChats';

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
    userStatus: UpdateUserStatusReducer,
    userRole: UpdateUserRoleReducer,
    exchangeRate: ExchangeRatesReducer,
    chatBot: ChatReducer,
    allChatBot: AllchatReducer,
  }
})

export default store;
