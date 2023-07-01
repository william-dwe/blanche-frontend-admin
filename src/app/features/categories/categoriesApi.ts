import {
  IDeleteMarketplaceCategoryResponse,
  IGetCategoriesRequest,
  IGetCategoriesResponse,
  IGetMarketplaceCategoriesRequest,
  IGetMarketplaceCategoriesResponse,
  IGetMarketplaceCategoryByIDResponse,
} from '../../../helpers/types/category.interface';
import { apiSlice } from '../../api/apiSlice';

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<IGetCategoriesResponse, IGetCategoriesRequest>({
      query: (params) => {
        return { url: 'categories', method: 'GET', params };
      },
      transformResponse: (response: { data: IGetCategoriesResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Category'],
    }),
    createCategory: build.mutation<null, FormData>({
      query: (body) => {
        return { url: 'marketplace/categories', method: 'POST', body };
      },
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Category'],
    }),
    getMarketplaceCategories: build.query<
      IGetMarketplaceCategoriesResponse,
      IGetMarketplaceCategoriesRequest
    >({
      query: (params) => {
        return { url: 'marketplace/categories', method: 'GET', params };
      },
      transformResponse: (response: {
        data: IGetMarketplaceCategoriesResponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Category'],
    }),
    deleteMarketPlaceCategory: build.mutation<
      IDeleteMarketplaceCategoryResponse,
      number
    >({
      query: (id) => {
        return { url: `marketplace/categories/${id}`, method: 'DELETE' };
      },
      transformResponse: (response: {
        data: IDeleteMarketplaceCategoryResponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Category'],
    }),
    getMarketplaceCategoryByID: build.query<
      IGetMarketplaceCategoryByIDResponse,
      number
    >({
      query: (id) => {
        return { url: `marketplace/categories/${id}`, method: 'GET' };
      },
      transformResponse: (response: {
        data: IGetMarketplaceCategoryByIDResponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Category'],
    }),
    updateMarketplaceCategory: build.mutation<
      null,
      { id: number; body: FormData }
    >({
      query: ({ id, body }) => {
        return { url: `marketplace/categories/${id}`, method: 'PUT', body };
      },
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetMarketplaceCategoriesQuery,
  useDeleteMarketPlaceCategoryMutation,
  useGetMarketplaceCategoryByIDQuery,
  useUpdateMarketplaceCategoryMutation,
} = categoriesApi;
