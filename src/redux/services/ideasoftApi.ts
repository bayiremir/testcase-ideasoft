import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {storage} from '../../utils/Storage';
import {BASEURL, API_KEY} from '@env';

const baseQuery = fetchBaseQuery({
  baseUrl: BASEURL,
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json');
    let credentials = storage.getString('token');
    if (!credentials) {
      credentials = API_KEY;
      storage.set('token', credentials);
    }
    headers.set('Authorization', `Bearer ${credentials}`);
    return headers;
  },
});

const baseQueryWithCheck = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  // Unauthorized kontrolü ve hata işlemleri yapılabilir
  if (result.error?.status === 401) {
    console.error('Unauthorized, logging out...');
    // Çıkış işlemi veya toast mesaj
  }
  return result;
};

export const ideasoftApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithCheck,
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
  }),
});

export const {} = ideasoftApi;
