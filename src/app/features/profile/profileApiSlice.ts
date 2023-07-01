import {
  IAddSealabsPayAccountRequest,
  IAddSealabsPayAccountResponse,
  IEditAccountRequest,
  IGetProfileResponse,
  IGetSealabsPayAccountsResponse,
} from '../../../helpers/types';
import { apiSlice } from '../../api/apiSlice';

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<IGetProfileResponse, void>({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetProfileResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['User'],
    }),
    patchProfile: build.mutation<IGetProfileResponse, IEditAccountRequest>({
      query: (body) => ({
        url: '/users/profile',
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: { data: IGetProfileResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['User'],
    }),
    patchProfileDetails: build.mutation<IGetProfileResponse, FormData>({
      query: (body) => ({
        url: '/users/profile-details',
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: { data: IGetProfileResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  usePatchProfileMutation,
  usePatchProfileDetailsMutation,
} = profileApi;
