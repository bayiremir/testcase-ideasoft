import {configureStore} from '@reduxjs/toolkit';
import {ideasoftApi} from './services/ideasoftApi';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    [ideasoftApi.reducerPath]: ideasoftApi.reducer,
    userSlice: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(ideasoftApi.middleware),
});

export default store;
