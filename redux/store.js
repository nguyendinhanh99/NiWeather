import { configureStore } from '@reduxjs/toolkit';
import transactionSlice from './slices/transactionSlice';

export default configureStore({
  reducer: {
    transactions: transactionSlice,
  },
});
