import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {storage} from '../../utils/Storage';
import {BASEURL, API_KEY} from '@env';
import {Products} from '../../interface/products.interface';
import {CategoriesList} from '../../interface/categories.interface';

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
    // Product Endpoints
    getProducts: builder.query<Products, void>({
      query: () => 'products',
    }),
    getProductById: builder.query<Products, number>({
      query: id => `products/${id}`,
    }),
    createProduct: builder.mutation<void, Partial<Products>>({
      query: body => ({
        url: 'products',
        method: 'POST',
        body,
      }),
    }),
    updateProduct: builder.mutation<
      void,
      {id: number; data: Partial<Products>}
    >({
      query: ({id, data}) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation<void, number>({
      query: id => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),

    // Category Endpoints
    getCategories: builder.query<CategoriesList, void>({
      query: () => 'categories/search_tree',
    }),
    getCategoryById: builder.query<CategoriesList, number>({
      query: id => `categories/${id}`,
    }),
    createCategory: builder.mutation<void, Partial<CategoriesList>>({
      query: body => ({
        url: 'categories',
        method: 'POST',
        body,
      }),
    }),
    updateCategory: builder.mutation<
      void,
      {id: number; data: Partial<CategoriesList>}
    >({
      query: ({id, data}) => ({
        url: `categories/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCategory: builder.mutation<void, number>({
      query: id => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = ideasoftApi;
