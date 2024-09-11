import { configureStore } from '@reduxjs/toolkit';
import userManagement from './reducers/userManagement';
import productManagement from './reducers/productManagement';
import cartReducer from './reducers/cartReducer';

export const store = configureStore({
  reducer: {
    users: userManagement,
    products: productManagement,
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
