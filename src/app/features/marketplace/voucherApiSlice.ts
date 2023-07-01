import {
  ICreateVoucherRequest,
  IGetVoucherRequest,
  IGetVoucherResponse,
  IVoucher,
} from '../../../helpers/types/voucher.interface';
import { apiSlice } from '../../api/apiSlice';

export const voucherApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createVoucher: build.mutation<void, ICreateVoucherRequest>({
      query: (body) => ({
        url: '/marketplace/vouchers',
        method: 'POST',
        body,
      }),
      transformResponse: (response: void) => response,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Vouchers'],
    }),
    getVouchers: build.query<IGetVoucherResponse, IGetVoucherRequest>({
      query: (params) => ({
        url: '/marketplace/vouchers/admin',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetVoucherResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Vouchers'],
    }),
    deleteVoucher: build.mutation<void, { code: string }>({
      query: (body) => ({
        url: `/marketplace/vouchers/${body.code}`,
        method: 'DELETE',
      }),
      transformResponse: (response: void) => response,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Vouchers'],
    }),
    getVoucherByCode: build.query<IVoucher, { code: string }>({
      query: (params) => ({
        url: `/marketplace/vouchers/${params.code}`,
      }),
      transformResponse: (response: { data: IVoucher }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    updateVoucher: build.mutation<void, ICreateVoucherRequest>({
      query: (body) => ({
        url: `/marketplace/vouchers/${body.code}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: void) => response,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Vouchers'],
    }),
  }),
});

export const {
  useCreateVoucherMutation,
  useGetVouchersQuery,
  useDeleteVoucherMutation,
  useGetVoucherByCodeQuery,
  useUpdateVoucherMutation,
  useLazyGetVouchersQuery,
  useLazyGetVoucherByCodeQuery,
} = voucherApi;
