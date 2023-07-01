import {
  ILoginRequest,
  ILoginResponse,
  IRefreshResponse,
  IVerifyCodeRequest,
  IVerifyCodeResponse,
  IResetPasswordResponse,
  ISetNewPasswordRequest,
} from '../../../helpers/types';
import { apiSlice } from '../../api/apiSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({ url: '/login/admin', method: 'POST', body }),
      transformResponse: (response: { data: ILoginResponse }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: '/logout', method: 'POST' }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['User'],
    }),
    refresh: build.query<IRefreshResponse, void>({
      query: () => ({ url: '/refresh', method: 'GET' }),
      transformResponse: (response: { data: IRefreshResponse }) => {
        return response.data;
      },
      transformErrorResponse: (response) => response.data,
    }),
    requestResetPassword: build.mutation<IResetPasswordResponse, void>({
      query: () => ({
        url: '/users/password/change-password/send-code',
        method: 'POST',
      }),
      transformResponse: (response: { data: IResetPasswordResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['User'],
    }),
    verifyResetPassword: build.mutation<
      IVerifyCodeResponse,
      IVerifyCodeRequest
    >({
      query: (body) => ({
        url: '/users/password/change-password/verify-code',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: IVerifyCodeResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    setNewPassword: build.mutation<null, ISetNewPasswordRequest>({
      query: (body) => ({
        url: '/users/password/reset',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useLazyRefreshQuery,
  useRefreshQuery,
  useRequestResetPasswordMutation,
  useVerifyResetPasswordMutation,
  useSetNewPasswordMutation,
} = authApi;
