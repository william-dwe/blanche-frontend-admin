import { IActionRefundResponse, IParams } from '../../../helpers/types';
import {
  IGetRefundResponse,
  IRefundMessageResponse,
  IPostRefundMessageRequest,
} from '../../../helpers/types';
import { apiSlice } from '../../api/apiSlice';

export const refundApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRefundList: build.query<IGetRefundResponse, IParams>({
      query: (params) => ({
        url: '/marketplace/refund-requests',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetRefundResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Refund'],
    }),
    getMessageRefundRequest: build.query<IRefundMessageResponse, number>({
      query: (id) => ({
        url: `/marketplace/refund-requests/${id}/messages`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IRefundMessageResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Message'],
    }),
    postMessageRefundRequest: build.mutation<null, IPostRefundMessageRequest>({
      query: ({ id, ...body }) => ({
        url: `/marketplace/refund-requests/${id}/messages`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Message'],
    }),
    acceptRefundRequest: build.mutation<IActionRefundResponse, number>({
      query: (id) => ({
        url: `/marketplace/refund-requests/${id}/accept`,
        method: 'POST',
      }),
      transformResponse: (response: { data: IActionRefundResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Message'],
    }),
    rejectRefundRequest: build.mutation<IActionRefundResponse, number>({
      query: (id) => ({
        url: `/marketplace/refund-requests/${id}/reject`,
        method: 'POST',
      }),
      transformResponse: (response: { data: IActionRefundResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetRefundListQuery,
  useGetMessageRefundRequestQuery,
  usePostMessageRefundRequestMutation,
  useAcceptRefundRequestMutation,
  useRejectRefundRequestMutation,
  useLazyGetMessageRefundRequestQuery,
} = refundApiSlice;
