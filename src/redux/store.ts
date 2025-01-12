import {configureStore} from '@reduxjs/toolkit';
import {ideasoftApi} from './services/ideasoftApi';

const store = configureStore({
  reducer: {
    [ideasoftApi.reducerPath]: ideasoftApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(ideasoftApi.middleware),
});

export default store;
