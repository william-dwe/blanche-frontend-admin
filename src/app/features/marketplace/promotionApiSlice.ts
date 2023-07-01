import {
  IGetPromotionRequest,
  IGetPromotionResponse,
  IPromotionBanner,
} from '../../../helpers/types/promotion.interface';
import { apiSlice } from '../../api/apiSlice';

export const promotionApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPromotions: build.query<IGetPromotionResponse, IGetPromotionRequest>({
      query: () => ({
        url: '/marketplace/promotion-banners',
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetPromotionResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Promotions'],
    }),
    getPromotionBannerById: build.query<IPromotionBanner, number>({
      query: (id) => ({
        url: `/marketplace/promotion-banners/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IPromotionBanner }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    createPromotion: build.mutation<IPromotionBanner, FormData>({
      query: (body) => ({
        url: '/marketplace/promotion-banners',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: IPromotionBanner }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Promotions'],
    }),
    updatePromotion: build.mutation<
      IPromotionBanner,
      { id: number; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/marketplace/promotion-banners/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: IPromotionBanner }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Promotions'],
    }),
    deletePromotion: build.mutation<void, number>({
      query: (id) => ({
        url: `/marketplace/promotion-banners/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Promotions'],
    }),
  }),
});

export const {
  useGetPromotionsQuery,
  useLazyGetPromotionBannerByIdQuery,
  useGetPromotionBannerByIdQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionApi;
