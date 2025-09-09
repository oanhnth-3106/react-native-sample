import { configureStore } from '@reduxjs/toolkit';
import authStore from './auth';

export const store = configureStore({
  reducer: {
    auth: authStore,
  },
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;