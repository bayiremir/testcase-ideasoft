import {configureStore} from '@reduxjs/toolkit';
import {ideasoftApi} from './services/ideasoftApi';

const store = configureStore({
  reducer: ideasoftApi.reducer,
});

export default store;
