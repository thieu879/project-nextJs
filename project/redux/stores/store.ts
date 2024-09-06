// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userManagement from './reducers/userManagement';

export const store = configureStore({
  reducer: {
    admin: userManagement,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
