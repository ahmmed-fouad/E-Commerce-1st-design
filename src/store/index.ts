import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from './services/productsApi'
import userReducer from "./features/userSlice";
import formReducer from "./features/formSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    form: formReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 